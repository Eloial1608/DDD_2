import { CommunityPlan } from '@Core/CommunityPlan/domain/CommunityPlan'
import { Id } from '@Core/CommunityPlan/domain/ValueObjects/Id'
import { Name } from '@Core/CommunityPlan/domain/ValueObjects/Name'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CreatedAt } from '@Core/CommunityPlan/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/CommunityPlan/domain/ValueObjects/UpdatedAt'
import { AllowedFeatures } from '@Core/CommunityPlan/domain/ValueObjects/AllowedFeatures'
import { AllowedUsers } from '@Core/CommunityPlan/domain/ValueObjects/AllowedUsers'
import { Description } from '@Core/CommunityPlan/domain/ValueObjects/Description'
import { Price, PriceCurrency, PriceValue } from '@Core/CommunityPlan/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/CommunityPlan/domain/ValueObjects/RenovationInterval'
import { RenovationType } from '@Core/CommunityPlan/domain/ValueObjects/RenovationType'

const CommunityPlanPriceSchema = new EntitySchema<Price>({
  name: 'communityPlanPrice',
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

export const CommunityPlanSchema = new EntitySchema<CommunityPlan>({
  name: 'CommunityPlan',
  target: CommunityPlan,
  tableName: 'community_plan',
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
    allowedFeatures: {
      type: 'jsonb',
      transformer: {
        to: (data: AllowedFeatures): string => JSON.stringify(data.valueOf().map(x => x.valueOf())),
        from: (data: string): AllowedFeatures => AllowedFeatures.fromPrimitives(JSON.parse(data))
      }
    },
    allowedUsers: {
      type: 'int',
      default: 1,
      transformer: ValueObjectTransformer(AllowedUsers)
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
  embeddeds: {
    price: {
      schema: CommunityPlanPriceSchema,
      prefix: 'price'
    }
  }
})
