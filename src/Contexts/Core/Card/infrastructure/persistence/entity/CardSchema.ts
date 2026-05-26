import { Balance } from "@Core/Card/domain/ValueObjects/Balance";
import { CreatedAt } from "@Core/Card/domain/ValueObjects/CreatedAt";
import { DeletedAt } from "@Core/Card/domain/ValueObjects/DeletedAt";
import { UpdatedAt } from "@Core/Card/domain/ValueObjects/UpdatedAt";
import { Card } from "@Core/Card/domain/Card";
import { AccountId } from "@Core/Card/domain/ValueObjects/AccountId";
import { CardPin } from "@Core/Card/domain/ValueObjects/CardPin";
import { Cvv } from "@Core/Card/domain/ValueObjects/Cvv";
import { Expiration } from "@Core/Card/domain/ValueObjects/Expiration";
import { LimitCard } from "@Core/Card/domain/ValueObjects/LimitCard";
import { NumCard } from "@Core/Card/domain/ValueObjects/NumCard";
import { Type_Card } from "@Core/Card/domain/ValueObjects/Type_Card";
import { ValueObjectTransformer } from "@Shared/domain/ValueObjects/ValueObjectTransformer";
import { EntitySchema } from "typeorm";
import { Id } from "@Core/Card/domain/ValueObjects/Id";
import { IsBlocked } from "../../../domain/ValueObjects/IsBlocked";

export const CardSchema = new EntitySchema<Card>({
  name: 'Card',
  target: Card,
  tableName: 'card',

  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id),
    },

    numCard: {
      type: String,
      unique: true,
      transformer: ValueObjectTransformer(NumCard),
    },

    type_Card: {
      type: String,
      transformer: ValueObjectTransformer(Type_Card),
    },

    limitCard: {
      type: Number,
      transformer: ValueObjectTransformer(LimitCard),
    },

    balance: {
      type: Number,
      nullable: false,
      transformer: ValueObjectTransformer(Balance),
    },

    expiration: {
      type: Date,
      nullable: false,
      transformer: ValueObjectTransformer(Expiration),
    },

    cardPin: {
      type: String,
      nullable: false,
      transformer: ValueObjectTransformer(CardPin),
    },

    cvv: {
      type: String,
      nullable: false,
      transformer: ValueObjectTransformer(Cvv),
    },

    accountId: {
      type: String,
      nullable: false,
      transformer: ValueObjectTransformer(AccountId),
    },
    isBlocked: {
      type: Boolean,
      default: false,
      transformer: ValueObjectTransformer(IsBlocked)
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
      name: 'IDX_CARD_ACCOUNT',
      columns: ['accountId'],
    },
    {
      name: 'IDX_CARD_NUM',
      columns: ['numCard'],
      unique: true,
    },
  ],
});