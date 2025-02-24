import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { AccountId } from './ValueObjects/AccountId'
import { ProductType } from './ValueObjects/ProductType'
import { ProductId } from './ValueObjects/ProductId'
import { Price } from './ValueObjects/Price'
import { Nullable } from '@Shared/domain/Nullable'
import { RenovationInterval } from './ValueObjects/RenovationInterval'
import { RenovationType } from './ValueObjects/RenovationType'
import { Name } from './ValueObjects/Name'
import { PriceId } from './ValueObjects/PriceId'
import { StripeProductCreatedDomainEvent } from './Events/StripeProductCreatedDomainEvent'
import { StripeProductUpdatedDomainEvent } from './Events/StripeProductUpdatedDomainEvent'

export class StripeProduct extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly name: Name,
        readonly accountId: AccountId,
        readonly productType: ProductType,
        readonly productId: ProductId,
        readonly price: Price,
        readonly priceId: PriceId,
        readonly renovationInterval: Nullable<RenovationInterval>,
        readonly renovationType: Nullable<RenovationType>
  ) {
    super()
  }

  static create (
    id: Id,
    name: Name,
    accountId: AccountId,
    productType: ProductType,
    productId: ProductId,
    price: Price,
    priceId: PriceId,
    renovationInterval: Nullable<RenovationInterval>,
    renovationType: Nullable<RenovationType>
  ) {
    const product = new StripeProduct(
      id,
      name,
      accountId,
      productType,
      productId,
      price,
      priceId,
      renovationInterval,
      renovationType
    )

    product.record(StripeProductCreatedDomainEvent.fromAggregate(product))

    return product
  }

  update (
    name: Name,
    accountId: AccountId,
    productType: ProductType,
    productId: ProductId,
    price: Price,
    priceId: PriceId,
    renovationInterval: Nullable<RenovationInterval>,
    renovationType: Nullable<RenovationType>
  ) {
    const product = new StripeProduct(
      this.id,
      name,
      accountId,
      productType,
      productId,
      price,
      priceId,
      renovationInterval,
      renovationType
    )

    product.record(StripeProductUpdatedDomainEvent.fromAggregate(product))

    return product
  }
}
