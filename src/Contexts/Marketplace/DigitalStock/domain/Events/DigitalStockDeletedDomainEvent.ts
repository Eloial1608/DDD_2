import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import type { AvailableDigitalStockType } from '../ValueObjects/DigitalStockType'
import type { DigitalStock } from '../DigitalStock'
import type { Nullable } from '@Shared/domain/Nullable'

interface DigitalStockDeletedDomainEventAttributes {
  id: string
  communityId: string
  productId: string
  type: AvailableDigitalStockType
  value: string
  isAvailable: boolean
  purchasedAt: Nullable<Date>
}

export class DigitalStockDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'app.gathered.marketplace.digitalStock.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly productId: string
  readonly type: AvailableDigitalStockType
  readonly value: string
  readonly isAvailable: boolean
  readonly purchasedAt: Nullable<Date>

  constructor (
    aggregateId: string,
    attributes: DigitalStockDeletedDomainEventAttributes,
    eventId?: string,
    occurredOn?: Date
  ) {
    super(DigitalStockDeletedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn)
    this.id = attributes.id
    this.communityId = attributes.communityId
    this.productId = attributes.productId
    this.type = attributes.type
    this.value = attributes.value
    this.isAvailable = attributes.isAvailable
    this.purchasedAt = attributes.purchasedAt
  }

  static fromAggregate (stock: DigitalStock): DigitalStockDeletedDomainEvent {
    return new DigitalStockDeletedDomainEvent(
      stock.id.valueOf(),
      {
        id: stock.id.valueOf(),
        communityId: stock.communityId.valueOf(),
        productId: stock.productId.valueOf(),
        type: stock.type.valueOf(),
        value: stock.value.valueOf(),
        isAvailable: stock.isAvailable.valueOf(),
        purchasedAt: stock.purchasedAt ? stock.purchasedAt.valueOf() : null
      }
    )
  }

  toPrimitive () {
    return {
      id: this.id,
      communityId: this.communityId,
      productId: this.productId,
      type: this.type,
      value: this.value,
      isAvailable: this.isAvailable,
      purchasedAt: this.purchasedAt
    }
  }
}
