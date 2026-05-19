import { randomInt } from "crypto";
import { Id } from "@Core/Account/domain/ValueObjects/Id";
import { AccountRepository } from "@Core/Account/domain/AccountRepository";
import { Card } from "@Core/Card/domain/Card";
import { CardRepository } from "@Core/Card/domain/CardRepository";
import { CardAlreadyExistsById } from "@Core/Card/domain/Errors/CardAlreadyExistsById";
import { CardAlreadyExistsByNumber } from "@Core/Card/domain/Errors/CardAlreadyExistsByNumber";
import { AccountId } from "@Core/Card/domain/ValueObjects/AccountId";
import { CardPin } from "@Core/Card/domain/ValueObjects/CardPin";
import { Cvv } from "@Core/Card/domain/ValueObjects/Cvv";
import { Expiration } from "@Core/Card/domain/ValueObjects/Expiration";
import { LimitCard } from "@Core/Card/domain/ValueObjects/LimitCard";
import { NumCard } from "@Core/Card/domain/ValueObjects/NumCard";
import { Type_Card } from "@Core/Card/domain/ValueObjects/Type_Card";
import { Criteria } from "@Shared/domain/Criteria/Criteria";
import { Filter } from "@Shared/domain/Criteria/Filter";
import { Filters } from "@Shared/domain/Criteria/Filters";
import { Balance } from "@Core/Account/domain/ValueObjects/Balance";

export class Creator {
  constructor(
    private readonly repository: CardRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async run(
    type_Card: Type_Card,
    cardPin: CardPin,
    accountId: AccountId
  ): Promise<Card> {

    const id = new Id(Id.random().toString());
    const numCard = this.generateCardNumber();
    const cvv = this.generateCVV();
    const expiration = this.generateExpiration();
    await this.ensureCardDoesNotExist(id, numCard);
    const account = await this.accountRepository.find(accountId);

    if (!account) {
      throw new Error("Account not found");
    }

    const { balance, limitCard } = this.resolveFinancialValues(
      type_Card,
      account.balance
    );

    const card = Card.create(
      id,
      numCard,
      type_Card,
      balance,
      expiration,
      cardPin,
      cvv,
      accountId,
      limitCard
    );

    await this.repository.persist(card);

    return card;
  }

  private resolveFinancialValues(
    type: Type_Card,
    accountBalance: Balance
  ): {
    balance: Balance;
    limitCard: LimitCard;
  } {
    if (type.isDebit()) {
      return {
        balance: accountBalance,
        limitCard: new LimitCard(0),
      };
    }

    if (type.isCredit()) {
      const limitCard = new LimitCard(2000);

      return {
        balance: new Balance(limitCard.valueOf()),
        limitCard,
      };
    }

    throw new Error("Tipus de targeta no vàlid");
  }

  private generateCardNumber(): NumCard {
    const number = Array.from({ length: 16 }, () =>
      randomInt(0, 10)
    ).join("");

    return new NumCard(number);
  }

  private generateCVV(): Cvv {
    const cvv = randomInt(100, 1000).toString();
    return new Cvv(cvv);
  }

  private generateExpiration(): Expiration {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 10);

    return new Expiration(date);
  }

  private async ensureCardDoesNotExist(
    id: Id,
    numCard: NumCard
  ): Promise<void> {

    const existingById = await this.repository.find(id);

    if (existingById) {
      throw new CardAlreadyExistsById(existingById.id);
    }

    const existingByNumber = await this.repository.search(
      new Criteria(
        new Filters([
          Filter.simple("numCard", "=", numCard.valueOf())
        ])
      )
    );

    if (existingByNumber.length > 0) {
      throw new CardAlreadyExistsByNumber(numCard);
    }
  }
}