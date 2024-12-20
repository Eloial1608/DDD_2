import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { StripeProduct } from '@Stripe/StripeProduct/domain/StripeProduct'
import { AccountId } from '@Stripe/StripeProduct/domain/ValueObjects/AccountId'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'
import { ProductId } from '@Stripe/StripeProduct/domain/ValueObjects/ProductId'
import { ProductType } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { RenovationInterval } from '@Stripe/StripeProduct/domain/ValueObjects/RenovationInterval'
import { RenovationType } from '@Stripe/StripeProduct/domain/ValueObjects/RenovationType'
import { EntitySchema } from 'typeorm'

export const StripeProductSchema = new EntitySchema<StripeProduct>({
  name: 'StripeProduct',
  target: StripeProduct,
  tableName: 'stripe_product',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    accountId: {
      type: String,
      transformer: ValueObjectTransformer(AccountId)
    },
    productId: {
      type: String,
      transformer: ValueObjectTransformer(ProductId)
    },
    productType: {
      type: String,
      transformer: ValueObjectTransformer(ProductType)
    },
    price: {
      type: String,
      transformer: ValueObjectTransformer(Price)
    },
    renovationInterval: {
      type: Number,
      transformer: ValueObjectTransformer(RenovationInterval)
    },
    renovationType: {
      type: String,
      transformer: ValueObjectTransformer(RenovationType)
    }
  }
})
