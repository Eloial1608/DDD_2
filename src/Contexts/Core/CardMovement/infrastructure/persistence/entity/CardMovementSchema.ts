import { EntitySchema } from "typeorm"
import { CardMovement } from "@Core/CardMovement/domain/CardMovement"
import { CardId } from "@Core/CardMovement/domain/ValueObjects/CardId"
import { CardMovementAmount } from "@Core/CardMovement/domain/ValueObjects/CardMovementAmount"
import { CardMovementDescription } from "@Core/CardMovement/domain/ValueObjects/CardMovementDescription"
import { CardMovementId } from "@Core/CardMovement/domain/ValueObjects/CardMovementId"
import { CreatedAt } from "@Core/CardMovement/domain/ValueObjects/CreatedAt"
import { ValueObjectTransformer } from "@Shared/domain/ValueObjects/ValueObjectTransformer"
import { TransferId } from "../../../domain/ValueObjects/TransferId"

export const CardMovementSchema = new EntitySchema<CardMovement>({
  name: "CardMovement",
  target: CardMovement,
  tableName: "card_movements",

  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(CardMovementId),
    },

    operationId: {
      type: String,
      transformer: ValueObjectTransformer(TransferId),
    },

    cardId: {
      type: String,
      transformer: ValueObjectTransformer(CardId),
    },

    amount: {
      type: Number,
      transformer: ValueObjectTransformer(CardMovementAmount),
    },

    description: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(CardMovementDescription),
    },

    accountMovementId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(CardMovementId),
    },

    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt),
    },
  },

  indices: [
    {
      name: "IDX_CARD_ID",
      columns: ["cardId"],
    },
    {
      name: "IDX_ACCOUNT_MOVEMENT",
      columns: ["accountMovementId"],
    },
  ],
})