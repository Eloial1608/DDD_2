import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import type { Id } from './ValueObjects/Id'
import type { CommunityId } from './ValueObjects/CommunityId'
import type { ProductId } from './ValueObjects/ProductId'
import type { DigitalStockType } from './ValueObjects/DigitalStockType'
import type { Value } from './ValueObjects/Value'
import type { IsAvailable } from './ValueObjects/IsAvailable'
import type { PurchasedAt } from './ValueObjects/PurchasedAt'
import { DigitalStockCreatedDomainEvent } from './Events/DigitalStockCreatedDomainEvent'
import { DigitalStockUpdatedDomainEvent } from './Events/DigitalStockUpdatedDomainEvent'
import type { Nullable } from '@Shared/domain/Nullable'
import { DigitalStockDeletedDomainEvent } from './Events/DigitalStockDeletedDomainEvent'

export class DigitalStock extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly communityId: CommunityId,
    readonly productId: ProductId,
    readonly type: DigitalStockType,
    readonly value: Value,
    readonly isAvailable: IsAvailable,
    readonly purchasedAt: Nullable<PurchasedAt>
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
    const stock = new DigitalStock(id, communityId, productId, type, value, isAvailable, null)
    stock.record(DigitalStockCreatedDomainEvent.fromAggregate(stock))
    return stock
  }

  update (
    type: DigitalStockType,
    value: Value,
    isAvailable: IsAvailable
  ): DigitalStock {
    const updated = new DigitalStock(
      this.id,
      this.communityId,
      this.productId,
      type,
      value,
      isAvailable,
      this.purchasedAt
    )

    updated.record(DigitalStockUpdatedDomainEvent.fromAggregate(updated))

    return updated
  }

  delete (): DigitalStock {
    const deleted = new DigitalStock(
      this.id,
      this.communityId,
      this.productId,
      this.type,
      this.value,
      this.isAvailable,
      this.purchasedAt
    )

    deleted.record(DigitalStockDeletedDomainEvent.fromAggregate(deleted))

    return deleted
  }
}
