import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Nullable } from "vitest";

import { Balance } from "./ValueObjects/Balance";
import { CreatedAt } from "./ValueObjects/CreatedAt";
import { DeletedAt } from "./ValueObjects/DeletedAt";
import { Iban } from "./ValueObjects/Iban";
import { Id } from "./ValueObjects/Id";
import { Type_Account } from "./ValueObjects/Type_Account";
import { UpdatedAt } from "./ValueObjects/UpdatedAt";
import { UserId } from "./ValueObjects/UserId";

export class Account extends AggregateRoot {
  constructor(
    readonly id: Id,
    readonly iban: Iban,
    readonly balance: Balance,
    readonly userId: UserId,
    readonly type_account: Type_Account,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super();
  }

  static create(
    id: Id,
    iban: Iban,
    userId: UserId,
    type_account: Type_Account
  ): Account {
    const now = new Date();

    return new Account(
      id,
      iban,
      new Balance(0),
      userId,
      type_account,
      new CreatedAt(now),
      new UpdatedAt(now),
      null
    );
  }

  update(
    iban: Iban,
    balance: Balance,
    type_account: Type_Account
  ): Account {
    return new Account(
      this.id,
      iban,
      balance,
      this.userId,
      type_account,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    );
  }

  delete(): Account {
    return new Account(
      this.id,
      this.iban,
      this.balance,
      this.userId,
      this.type_account,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    );
  }
}