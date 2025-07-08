import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import type { Id } from './ValueObjects/Id'
import type { CommunityId } from './ValueObjects/CommunityId'
import type { ProductId } from './ValueObjects/ProductId'
import type { DigitalStockType } from './ValueObjects/DigitalStockType'
import type { Value } from './ValueObjects/Value'
import type { IsAvailable } from './ValueObjects/IsAvailable'
import { PurchasedAt } from './ValueObjects/PurchasedAt'
import { DigitalStockCreatedDomainEvent } from './Events/DigitalStockCreatedDomainEvent'

export class DigitalStock extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly communityId: CommunityId,
    readonly productId: ProductId,
    readonly type: DigitalStockType,
    readonly value: Value,
    readonly isAvailable: IsAvailable,
    readonly purchasedAt: PurchasedAt
  ) {
    super()
  }

  static create (
    id: Id,
    communityId: CommunityId,
    productId: ProductId,
    type: DigitalStockType,
    value: Value,
    isAvailable: IsAvailable
  ): DigitalStock {
    const stock = new DigitalStock(id, communityId, productId, type, value, isAvailable, new PurchasedAt(new Date()))
    stock.record(DigitalStockCreatedDomainEvent.fromAggregate(stock))
    return stock
  }
}
