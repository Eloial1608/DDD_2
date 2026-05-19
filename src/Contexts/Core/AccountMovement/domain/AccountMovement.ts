  import { AggregateRoot } from "@Shared/domain/AggregateRoot";
  import { Nullable } from "@Shared/domain/Nullable";
  import { AccountId } from "./ValueObjects/AccountId";
  import { AccountMovementAmount } from "./ValueObjects/AccountMovementAmount";
  import { AccountMovementType } from "./ValueObjects/AccountMovementType";
  import { AccountMovementDescription } from "./ValueObjects/AccountMovementDescription";
  import { CardId } from "./ValueObjects/CardId";
  import { CreatedAt } from "./ValueObjects/CreatedAt";
  import { RelatedAccountId } from "./ValueObjects/RelatedAccountId";
  import { TransferId } from "./ValueObjects/TransferId";
import { AccountMovementId } from "./ValueObjects/AccountMovementId";

  export class AccountMovement extends AggregateRoot {
    constructor(
      readonly id: AccountMovementId,
      readonly transferId: TransferId,
      readonly accountId: AccountId,
      readonly amount: AccountMovementAmount,
      readonly type: AccountMovementType,
      readonly description: AccountMovementDescription,
      readonly relatedAccountId: RelatedAccountId | null,
      readonly cardId: CardId | null,
      readonly createdAt: CreatedAt,
    ) {
      super();
    }

    static create(
      id: AccountMovementId,
      transferId: TransferId,
      accountId: AccountId,
      amount: AccountMovementAmount,
      type: AccountMovementType,
      description: AccountMovementDescription,
      relatedAccountId: Nullable<RelatedAccountId>,
      cardId: Nullable<CardId>,
    ): AccountMovement {
      const now = new Date();

      return new AccountMovement(
        id,
        transferId,
        accountId,
        amount,
        type,
        description,
        relatedAccountId ?? null,
        cardId ?? null,
        new CreatedAt(now)
      );
    }
  }