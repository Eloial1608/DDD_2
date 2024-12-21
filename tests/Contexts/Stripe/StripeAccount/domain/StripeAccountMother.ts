import { StripeAccount } from '@Stripe/StripeAccount/domain/StripeAccount'
import { ApiKey } from '@Stripe/StripeAccount/domain/ValueObjects/ApiKey'
import { Id } from '@Stripe/StripeAccount/domain/ValueObjects/Id'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class StripeAccountMother {
  static create (params: Partial<StripeAccount>): StripeAccount {
    return new StripeAccount(
      params.id ?? new Id(UuidMother.random()),
      params.apiKey ?? new ApiKey(UuidMother.random())
    )
  }

  static random (): StripeAccount {
    return this.create({})
  }
}
