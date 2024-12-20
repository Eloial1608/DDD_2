import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { AccountId } from './ValueObjects/AccountId'
import { ProductType } from './ValueObjects/ProductType'
import { ProductId } from './ValueObjects/ProductId'
import { Price } from './ValueObjects/Price'
import { Nullable } from '@Shared/domain/Nullable'
import { RenovationInterval } from './ValueObjects/RenovationInterval'
import { RenovationType } from './ValueObjects/RenovationType'

export class StripeProduct extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly accountId: AccountId,
        readonly productType: ProductType,
        readonly productId: ProductId,
        readonly price: Price,
        readonly renovationInterval: Nullable<RenovationInterval>,
        readonly renovationType: Nullable<RenovationType>
  ) {
    super()
  }
}
