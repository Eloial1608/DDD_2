import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import type { DigitalStock } from '../DigitalStock'
import type { AvailableDigitalStockType } from '../ValueObjects/DigitalStockType'
import type { Nullable } from '@Shared/domain/Nullable'

export type DigitalStockCreatedDomainEventBody = {
  readonly id: string
  readonly communityId: string
  readonly productId: string
  readonly type: AvailableDigitalStockType
  readonly value: string
  readonly isAvailable: boolean
  readonly purchasedAt: Nullable<Date>
}

export class DigitalStockCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.marketplace.digitalStock.v1.created'

  readonly id: string
  readonly communityId: string
  readonly productId: string
  readonly type: AvailableDigitalStockType
  readonly value: string
  readonly isAvailable: boolean
  readonly purchasedAt: Nullable<Date>

  static {
    DomainEvent.derived.add(DigitalStockCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: DigitalStockCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(DigitalStockCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)
    this.id = params.id
    this.communityId = params.communityId
    this.productId = params.productId
    this.type = params.type
    this.value = params.value
    this.isAvailable = params.isAvailable
    this.purchasedAt = params.purchasedAt
  }

  static fromAggregate (stock: DigitalStock): DigitalStockCreatedDomainEvent {
    return new DigitalStockCreatedDomainEvent({
      id: stock.id.valueOf(),
      communityId: stock.communityId.valueOf(),
      productId: stock.productId.valueOf(),
      type: stock.type.valueOf(),
      value: stock.value.valueOf(),
      isAvailable: stock.isAvailable.valueOf(),
      purchasedAt: stock.purchasedAt?.valueOf()
    })
  }

  toPrimitive (): DigitalStockCreatedDomainEventBody {
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

  static fromPrimitives (id: string, attributes: DigitalStockCreatedDomainEventBody, eventId: string, occurredOn: Date): DigitalStockCreatedDomainEvent {
    return new DigitalStockCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
