import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { StripeAccount } from '@Stripe/StripeAccount/domain/StripeAccount'
import { ApiKey } from '@Stripe/StripeAccount/domain/ValueObjects/ApiKey'
import { Id } from '@Stripe/StripeAccount/domain/ValueObjects/Id'
import { EntitySchema } from 'typeorm'

export const StripeAccountSchema = new EntitySchema<StripeAccount>({
  name: 'StripeAccount',
  target: StripeAccount,
  tableName: 'stripe_account',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    apiKey: {
      type: String,
      transformer: ValueObjectTransformer(ApiKey)
    }
  }
})
