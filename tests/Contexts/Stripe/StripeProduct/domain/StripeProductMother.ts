import { StripeProduct } from '@Stripe/StripeProduct/domain/StripeProduct'
import { AccountId } from '@Stripe/StripeProduct/domain/ValueObjects/AccountId'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { Name } from '@Stripe/StripeProduct/domain/ValueObjects/Name'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'
import { PriceId } from '@Stripe/StripeProduct/domain/ValueObjects/PriceId'
import { ProductId } from '@Stripe/StripeProduct/domain/ValueObjects/ProductId'
import { ProductType, ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class StripeProductMother {
  static create (params: Partial<StripeProduct>): StripeProduct {
    return new StripeProduct(
      params.id ?? new Id(UuidMother.random()),
      params.name ?? new Name(MotherCreator.random().internet.displayName()),
      params.accountId ?? new AccountId(UuidMother.random()),
      params.productType ?? new ProductType(ProductTypes.USER_PLANS),
      params.productId ?? new ProductId(UuidMother.random()),
      params.price ?? new Price('0'),
      params.priceId ?? new PriceId(UuidMother.random()),
      params.renovationInterval ?? undefined,
      params.renovationType ?? undefined
    )
  }

  static random (): StripeProduct {
    return this.create({})
  }
}
