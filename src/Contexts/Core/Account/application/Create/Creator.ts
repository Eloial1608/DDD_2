import { Account } from "@Core/Account/domain/Account";
import { AccountRepository } from "@Core/Account/domain/AccountRepository";
import { AccountAlreadyExistsByIban } from "@Core/Account/domain/Errors/AccountAlreadyExistsByIban";
import { AccountAlreadyExistsById } from "@Core/Account/domain/Errors/AccountAlreadyExistsById";
import { Iban } from "@Core/Account/domain/ValueObjects/Iban";
import { Id } from "@Core/Account/domain/ValueObjects/Id";
import { Type_Account } from "@Core/Account/domain/ValueObjects/Type_Account";
import { UserId } from "@Core/Account/domain/ValueObjects/UserId";
import { Criteria } from "@Shared/domain/Criteria/Criteria";
import { Filter } from "@Shared/domain/Criteria/Filter";
import { Filters } from "@Shared/domain/Criteria/Filters";

export class Creator {
  constructor(readonly repository: AccountRepository) {}

  async run(
    userId: UserId,
    type_account: Type_Account
  ) {
    const id = new Id(Id.random().toString()) 
    const iban = this.generateIban()

    await this.checkIfAccountExists(id, iban);

    const account = Account.create(
      id,
      iban,
      userId,
      type_account
    );

    await this.repository.persist(account);
  }

  private generateIban(): Iban {
    const countryCode = 'ES'
    const controlDigits = Math.floor(10 + Math.random() * 90)
    const bankCode = '1234'
    const branchCode = '5678'
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000)

    return new Iban(`${countryCode}${controlDigits}${bankCode}${branchCode}${accountNumber}`)
  }

  private async checkIfAccountExists(id: Id, iban: Iban) {
    const existingById = await this.repository.find(id)

    if (existingById) {
      throw new AccountAlreadyExistsById(existingById.id)
    }

    const existingByIban = (
      await this.repository.search(
        new Criteria(
          new Filters([
            Filter.simple('iban', '=', iban.valueOf())
          ])
        )
      )
    ).pop()

    if (existingByIban) {
      throw new AccountAlreadyExistsByIban(iban)
    }
  }
}