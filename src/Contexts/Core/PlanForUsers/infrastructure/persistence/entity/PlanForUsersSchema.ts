import { PlanForUsers } from '@Core/PlanForUsers/domain/PlanForUsers'
import { CommunityId } from '@Core/PlanForUsers/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Core/PlanForUsers/domain/ValueObjects/CreatedAt'
import { Description } from '@Core/PlanForUsers/domain/ValueObjects/Description'
import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'
import { Name } from '@Core/PlanForUsers/domain/ValueObjects/Name'
import { Price, PriceCurrency, PriceValue } from '@Core/PlanForUsers/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/PlanForUsers/domain/ValueObjects/RenovatioInterval'
import { RenovationType } from '@Core/PlanForUsers/domain/ValueObjects/RenovationType'
import { UpdatedAt } from '@Core/PlanForUsers/domain/ValueObjects/UpdatedAt'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

const PlanForUsersPriceSchema = new EntitySchema<Price>({
  name: 'PlanForUsersPrice',
  target: Price,
  columns: {
    value: {
      type: 'int',
      transformer: ValueObjectTransformer(PriceValue)
    },
    currency: {
      type: String,
      transformer: ValueObjectTransformer(PriceCurrency)
    }
  }
})

export const PlanForUsersSchema = new EntitySchema<PlanForUsers>({
  name: 'PlanForUsers',
  target: PlanForUsers,
  tableName: 'plan_for_users',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(Name)
    },
    description: {
      type: String,
      transformer: ValueObjectTransformer(Description)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    renovationInterval: {
      type: 'int',
      transformer: ValueObjectTransformer(RenovationInterval)
    },
    renovationType: {
      type: String,
      transformer: ValueObjectTransformer(RenovationType)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    },
    updatedAt: {
      type: Date,
      updateDate: true,
      transformer: ValueObjectTransformer(UpdatedAt)
    }
  },
  indices: [
    {
      name: 'IDX_PLAN_FOR_USER_COMMUNITY_ID',
      columns: ['communityId']
    }
  ],
  embeddeds: {
    price: {
      schema: PlanForUsersPriceSchema,
      prefix: 'price'
    }
  }
})
