import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Nullable } from "@Shared/domain/Nullable";
import { AccountId } from "./ValueObjects/AccountId";
import { Balance } from "./ValueObjects/Balance";
import { Concept } from "./ValueObjects/Concept";
import { CreatedAt } from "./ValueObjects/CreatedAt";
import { Id } from "./ValueObjects/Id";
import { Transaction_Status } from "./ValueObjects/Transaction_Status";

export class Transaction extends AggregateRoot {
  constructor(
    readonly id: Id,
    readonly fromAccountId: Nullable<AccountId>,
    readonly toAccountId: Nullable<AccountId>,
    readonly fromCardId: Nullable<AccountId>,
    readonly toCardId: Nullable<AccountId>,
    readonly toPhoneNumber: Nullable<string>,
    readonly balance: Balance,
    readonly concept: Nullable<Concept>,
    readonly status: Transaction_Status,
    readonly createdAt: CreatedAt,
  ) {
    super();
  }

  static create(
    id: Id,
    fromAccountId: Nullable<AccountId>,
    toAccountId: Nullable<AccountId>,
    fromCardId: Nullable<AccountId>,
    toCardId: Nullable<AccountId>,
    toPhoneNumber: Nullable<string>,
    balance: Balance,
    concept: Nullable<Concept>,
    status: Transaction_Status
  ): Transaction {
    const now = new Date();

    return new Transaction(
      id,
      fromAccountId,
      toAccountId,
      fromCardId,
      toCardId,
      toPhoneNumber,
      balance,
      concept,
      status,
      new CreatedAt(now)
    );
  }
}