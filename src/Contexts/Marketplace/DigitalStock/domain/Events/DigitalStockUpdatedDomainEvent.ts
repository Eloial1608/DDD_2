import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import type { AvailableDigitalStockType } from '../ValueObjects/DigitalStockType'
import type { DigitalStock } from '../DigitalStock'

interface DigitalStockUpdatedDomainEventAttributes {
  id: string
  communityId: string
  productId: string
  type: AvailableDigitalStockType
  value: string
  isAvailable: boolean
}

export class DigitalStockUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'app.gathered.marketplace.digitalStock.v1.updated'

  readonly id: string
  readonly communityId: string
  readonly productId: string
  readonly type: AvailableDigitalStockType
  readonly value: string
  readonly isAvailable: boolean

  constructor (
    aggregateId: string,
    attributes: DigitalStockUpdatedDomainEventAttributes,
    eventId?: string,
    occurredOn?: Date
  ) {
    super(DigitalStockUpdatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn)

    this.id = attributes.id
    this.communityId = attributes.communityId
    this.productId = attributes.productId
    this.type = attributes.type
    this.value = attributes.value
    this.isAvailable = attributes.isAvailable
  }

  static fromAggregate (stock: DigitalStock): DigitalStockUpdatedDomainEvent {
    return new DigitalStockUpdatedDomainEvent(
      stock.id.valueOf(),
      {
        id: stock.id.valueOf(),
        communityId: stock.communityId.valueOf(),
        productId: stock.productId.valueOf(),
        type: stock.type.valueOf(),
        value: stock.value.valueOf(),
        isAvailable: stock.isAvailable.valueOf()
      }
    )
  }

  toPrimitive () {
    return {
      communityId: this.communityId,
      productId: this.productId,
      type: this.type,
      value: this.value,
      isAvailable: this.isAvailable
    }
  }
}
