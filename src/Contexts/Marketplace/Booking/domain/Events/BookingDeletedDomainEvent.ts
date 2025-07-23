import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import type { Booking } from '../Booking'

export class BookingDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'app.gathered.marketplace.booking.v1.deleted'

  readonly id: string
  readonly productId: string
  readonly userId: string
  readonly date: string
  readonly startTime: string
  readonly endTime: string

  constructor (
    aggregateId: string,
    {
      productId,
      userId,
      date,
      startTime,
      endTime
    }: {
      productId: string
      userId: string
      date: string
      startTime: string
      endTime: string
    },
    eventId?: string,
    occurredOn?: Date
  ) {
    super(BookingDeletedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn)
    this.id = aggregateId
    this.productId = productId
    this.userId = userId
    this.date = date
    this.startTime = startTime
    this.endTime = endTime
  }

  static fromAggregate (booking: Booking): BookingDeletedDomainEvent {
    return new BookingDeletedDomainEvent(booking.id.valueOf(), {
      productId: booking.productId.valueOf(),
      userId: booking.userId.valueOf(),
      date: booking.date.valueOf(),
      startTime: booking.startTime.valueOf(),
      endTime: booking.endTime.valueOf()
    })
  }

  toPrimitive () {
    return {
      id: this.id,
      productId: this.productId,
      userId: this.userId,
      date: this.date,
      startTime: this.startTime,
      endTime: this.endTime
    }
  }
}
