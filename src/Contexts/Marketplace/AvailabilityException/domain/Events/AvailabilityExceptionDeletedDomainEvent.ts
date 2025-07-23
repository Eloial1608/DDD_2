import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import type { AvailabilityException } from '../AvailabilityException'

export class AvailabilityExceptionDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'app.gathered.marketplace.availabilityException.v1.deleted'

  readonly id: string
  readonly productId: string
  readonly date: string
  readonly type: string

  constructor (
    aggregateId: string,
    {
      productId,
      date,
      type
    }: {
      productId: string
      date: string
      type: string
    },
    eventId?: string,
    occurredOn?: Date
  ) {
    super(AvailabilityExceptionDeletedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn)
    this.id = aggregateId
    this.productId = productId
    this.date = date
    this.type = type
  }

  static fromAggregate (exception: AvailabilityException): AvailabilityExceptionDeletedDomainEvent {
    return new AvailabilityExceptionDeletedDomainEvent(exception.id.valueOf(), {
      productId: exception.productId.valueOf(),
      date: exception.date.valueOf(),
      type: exception.type.valueOf()
    })
  }

  toPrimitive () {
    return {
      id: this.id,
      productId: this.productId,
      date: this.date,
      type: this.type
    }
  }
}
