import { Account } from "@Core/Account/domain/Account";
import { Balance } from "@Core/Account/domain/ValueObjects/Balance";
import { CreatedAt } from "@Core/Account/domain/ValueObjects/CreatedAt";
import { DeletedAt } from "@Core/Account/domain/ValueObjects/DeletedAt";
import { Iban } from "@Core/Account/domain/ValueObjects/Iban";
import { Id } from "@Core/Account/domain/ValueObjects/Id";
import { Type_Account } from "@Core/Account/domain/ValueObjects/Type_Account";
import { UpdatedAt } from "@Core/Account/domain/ValueObjects/UpdatedAt";
import { UserId } from "@Core/Account/domain/ValueObjects/UserId";
import { ValueObjectTransformer } from "@Shared/domain/ValueObjects/ValueObjectTransformer";
import { EntitySchema } from "typeorm";
import { PhoneNumber } from "../../../domain/ValueObjects/PhoneNumber";

export const AccountSchema = new EntitySchema<Account>({
  name: 'Account',
  target: Account,
  tableName: 'account',

  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id),
    },

    iban: {
      type: String,
      transformer: ValueObjectTransformer(Iban),
    },

    balance: {
      type: Number,
      transformer: ValueObjectTransformer(Balance),
    },

    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },

    type_account: {
      type: String,
      transformer: ValueObjectTransformer(Type_Account),
    },
    phoneNumber: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(PhoneNumber),
    },

    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt),
    },

    updatedAt: {
      type: Date,
      updateDate: true,
      transformer: ValueObjectTransformer(UpdatedAt),
    },

    deletedAt: {
      type: Date,
      nullable: true,
      deleteDate: true,
      transformer: ValueObjectTransformer(DeletedAt),
    },
  },

  indices: [
    {
      name: 'IDX_ACCOUNT_USER',
      columns: ['userId'],
    },
    {
      name: 'IDX_ACCOUNT_IBAN',
      columns: ['iban'],
      unique: true,
    },
  ],
});