import { Plan } from '@Core/Plan/domain/Plan'
import { Id } from '@Core/Plan/domain/ValueObjects/Id'
import { Name } from '@Core/Plan/domain/ValueObjects/Name'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CreatedAt } from '@Core/Plan/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/Plan/domain/ValueObjects/UpdatedAt'
import { AllowedFeatures } from '@Core/Plan/domain/ValueObjects/AllowedFeatures'
import { AllowedUsers } from '@Core/Plan/domain/ValueObjects/AllowedUsers'
import { DeletedAt } from '@Core/Plan/domain/ValueObjects/DeletedAt'
import { Description } from '@Core/Plan/domain/ValueObjects/Description'
import { Price, PriceCurrency, PriceValue } from '@Core/Plan/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/Plan/domain/ValueObjects/RenovationInterval'
import { RenovationType } from '@Core/Plan/domain/ValueObjects/RenovationType'
import { AllowedSubcommunities } from '@Core/Plan/domain/ValueObjects/AllowedSubcommunities'
import { IsPrivate } from '@Core/Plan/domain/ValueObjects/IsPrivate'
import { StripeId } from '@Core/Plan/domain/ValueObjects/StripeId'

const PlanPriceSchema = new EntitySchema<Price>({
  name: 'planPrice',
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

export const PlanSchema = new EntitySchema<Plan>({
  name: 'Plan',
  target: Plan,
  tableName: 'plan',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    stripeId: {
      type: String,
      transformer: ValueObjectTransformer(StripeId)
    },
    isPrivate: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsPrivate)
    },
    allowedSubcommunities: {
      type: 'int',
      transformer: ValueObjectTransformer(AllowedSubcommunities)
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
    },
    deletedAt: {
      type: Date,
      nullable: true,
      deleteDate: true,
      transformer: ValueObjectTransformer(DeletedAt)
    }
  },
  embeddeds: {
    price: {
      schema: PlanPriceSchema,
      prefix: 'price'
    }
  }
})
