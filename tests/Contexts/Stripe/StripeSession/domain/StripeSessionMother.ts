import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { StripeSession } from '@Stripe/StripeSession/domain/StripeSession'
import { AccountId } from '@Stripe/StripeSession/domain/ValueObjects/AccountId'
import { Completed } from '@Stripe/StripeSession/domain/ValueObjects/Completed'
import { FailUrl } from '@Stripe/StripeSession/domain/ValueObjects/FailUrl'
import { Id } from '@Stripe/StripeSession/domain/ValueObjects/Id'
import { Price } from '@Stripe/StripeSession/domain/ValueObjects/Price'
import { Product } from '@Stripe/StripeSession/domain/ValueObjects/Product'
import { StripeId } from '@Stripe/StripeSession/domain/ValueObjects/StripeId'
import { SuccessUrl } from '@Stripe/StripeSession/domain/ValueObjects/SuccessUrl'
import { Url } from '@Stripe/StripeSession/domain/ValueObjects/Url'
import { UrlMother } from '@Tests/Contexts/Shared/domain/UrlMother'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class StripeSessionMother {
  static create (params: Partial<StripeSession>): StripeSession {
    return new StripeSession(
      params.id ?? new Id(UuidMother.random()),
      params.accountId ?? new AccountId(UuidMother.random()),
      params.stripeId ?? new StripeId(UuidMother.random()),
      params.url ?? new Url(UrlMother.random()),
      params.product ?? new Product(
        UuidMother.random(),
        ProductTypes.USER_PLANS,
        UuidMother.random()
      ),
      params.price ?? new Price('100'),
      params.completed ?? new Completed(false),
      params.successUrl ?? new SuccessUrl(UrlMother.random()),
      params.failUrl ?? new FailUrl(UrlMother.random())
    )
  }

  static random (): StripeSession {
    return this.create({})
  }
}
