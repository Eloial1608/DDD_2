import { EntitySchema } from "typeorm";
import { AccountMovement } from "@Core/AccountMovement/domain/AccountMovement";
import { TransferId } from "@Core/AccountMovement/domain/ValueObjects/TransferId";
import { AccountId } from "@Core/AccountMovement/domain/ValueObjects/AccountId";
import { AccountMovementAmount } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementAmount";
import { AccountMovementType } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType";
import { AccountMovementDescription } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementDescription";
import { RelatedAccountId } from "@Core/AccountMovement/domain/ValueObjects/RelatedAccountId";
import { CardId } from "@Core/AccountMovement/domain/ValueObjects/CardId";
import { CreatedAt } from "@Core/AccountMovement/domain/ValueObjects/CreatedAt";
import { ValueObjectTransformer } from "@Shared/domain/ValueObjects/ValueObjectTransformer";

export const AccountMovementSchema = new EntitySchema<AccountMovement>({
  name: "AccountMovement",
  target: AccountMovement,
  tableName: "AccountMovements",

  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(AccountId),
    },

    transferId: {
      type: String,
      transformer: ValueObjectTransformer(TransferId),
    },

    accountId: {
      type: String,
      transformer: ValueObjectTransformer(AccountId),
    },

    amount: {
      type: Number,
      transformer: ValueObjectTransformer(AccountMovementAmount),
    },

    type: {
      type: String,
      transformer: ValueObjectTransformer(AccountMovementType),
    },

    description: {
      type: String,
      transformer: ValueObjectTransformer(AccountMovementDescription),
    },

    relatedAccountId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(RelatedAccountId),
    },

    cardId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(CardId),
    },

    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt),
    },
  },

  indices: [
    {
      name: "IDX_AccountMovement_ACCOUNT",
      columns: ["accountId"],
    },
    {
      name: "IDX_AccountMovement_TRANSFER",
      columns: ["transferId"],
    },
    {
      name: "IDX_AccountMovement_TYPE",
      columns: ["type"],
    },
  ],
});