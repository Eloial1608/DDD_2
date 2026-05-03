import { EntitySchema } from "typeorm";

import { Transaction } from "@Core/Transaction/domain/Transaction";
import { Id } from "@Core/Transaction/domain/ValueObjects/Id";
import { AccountId } from "@Core/Transaction/domain/ValueObjects/AccountId";
import { Balance } from "@Core/Transaction/domain/ValueObjects/Balance";
import { Transaction_Status } from "@Core/Transaction/domain/ValueObjects/Transaction_Status";
import { CreatedAt } from "@Core/Transaction/domain/ValueObjects/CreatedAt";
import { Concept } from "@Core/Transaction/domain/ValueObjects/Concept";

import { ValueObjectTransformer } from "@Shared/domain/ValueObjects/ValueObjectTransformer";

export const TransactionSchema = new EntitySchema<Transaction>({
  name: "Transaction",
  target: Transaction,
  tableName: "transactions",

  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id),
    },

    fromAccountId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(AccountId),
    },

    toAccountId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(AccountId),
    },

    fromCardId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(AccountId),
    },

    toCardId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(AccountId),
    },

    toPhoneNumber: {
      type: String,
      nullable: true,
    },

    balance: {
      type: Number,
      transformer: ValueObjectTransformer(Balance),
    },

    concept: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(Concept),
    },

    status: {
      type: String,
      transformer: ValueObjectTransformer(Transaction_Status),
    },

    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt),
    },
  },

  indices: [
    {
      name: "IDX_TRANSACTION_FROM_ACCOUNT",
      columns: ["fromAccountId"],
    },
    {
      name: "IDX_TRANSACTION_TO_ACCOUNT",
      columns: ["toAccountId"],
    },
    {
      name: "IDX_TRANSACTION_STATUS",
      columns: ["status"],
    },
  ],
});