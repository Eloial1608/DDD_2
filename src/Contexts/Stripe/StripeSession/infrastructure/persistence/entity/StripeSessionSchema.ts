import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { StripeSession } from '@Stripe/StripeSession/domain/StripeSession'
import { AccountId } from '@Stripe/StripeSession/domain/ValueObjects/AccountId'
import { Completed } from '@Stripe/StripeSession/domain/ValueObjects/Completed'
import { CustomerId } from '@Stripe/StripeSession/domain/ValueObjects/CustomerId'
import { FailUrl } from '@Stripe/StripeSession/domain/ValueObjects/FailUrl'
import { Id } from '@Stripe/StripeSession/domain/ValueObjects/Id'
import { Price } from '@Stripe/StripeSession/domain/ValueObjects/Price'
import { Product } from '@Stripe/StripeSession/domain/ValueObjects/Product'
import { StripeId } from '@Stripe/StripeSession/domain/ValueObjects/StripeId'
import { SuccessUrl } from '@Stripe/StripeSession/domain/ValueObjects/SuccessUrl'
import { Url } from '@Stripe/StripeSession/domain/ValueObjects/Url'
import { EntitySchema } from 'typeorm'

const ProductSchema = new EntitySchema<Product>({
  name: 'Product',
  target: Product,
  columns: {
    id: {
      type: String
    },
    type: {
      type: String
    },
    priceId: {
      type: String
    },
    name: {
      type: String
    },
    renovationInterval: {
      type: Number,
      nullable: true
    },
    renovationType: {
      type: String,
      nullable: true
    }
  }
})

export const StripeSessionSchema = new EntitySchema<StripeSession>({
  name: 'StripeSession',
  target: StripeSession,
  tableName: 'stripe_session',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    stripeId: {
      type: String,
      unique: true,
      transformer: ValueObjectTransformer(StripeId)
    },
    url: {
      type: String,
      transformer: ValueObjectTransformer(Url)
    },
    customerId: {
      type: String,
      transformer: ValueObjectTransformer(CustomerId)
    },
    accountId: {
      type: String,
      transformer: ValueObjectTransformer(AccountId)
    },
    price: {
      type: String,
      transformer: ValueObjectTransformer(Price)
    },
    completed: {
      type: Boolean,
      transformer: ValueObjectTransformer(Completed)
    },
    successUrl: {
      type: String,
      transformer: ValueObjectTransformer(SuccessUrl)
    },
    failUrl: {
      type: String,
      transformer: ValueObjectTransformer(FailUrl)
    }
  },
  embeddeds: {
    product: {
      schema: ProductSchema,
      prefix: 'product'
    }
  }
})
