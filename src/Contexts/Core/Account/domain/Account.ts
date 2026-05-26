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
import { PhoneNumber } from "./ValueObjects/PhoneNumber";

export class Account extends AggregateRoot {
  constructor(
    readonly id: Id,
    readonly iban: Iban,
    readonly balance: Balance,
    readonly userId: UserId,
    readonly type_account: Type_Account,
    readonly phoneNumber: Nullable<PhoneNumber>,
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
    type_account: Type_Account,
    phoneNumber: Nullable<PhoneNumber>
  ): Account {
    const now = new Date();

    return new Account(
      id,
      iban,
      new Balance(0),
      userId,
      type_account,
      phoneNumber,
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
      this.phoneNumber,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    );
  }

  updateBalance(
    balance: Balance,
  ): Account {
    return new Account(
      this.id,
      this.iban,
      balance,
      this.userId,
      this.type_account,
      this.phoneNumber,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    );
  }

  updatePhoneNumber(
    phoneNumber: Nullable<PhoneNumber>
  ): Account {
    return new Account(
      this.id,
      this.iban,
      this.balance,
      this.userId,
      this.type_account,
      phoneNumber,
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
      this.phoneNumber,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    );
  }
}