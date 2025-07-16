import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import type { BookingId } from './ValueObjects/BookingId'
import type { ProductId } from './ValueObjects/ProductId'
import type { UserId } from './ValueObjects/UserId'
import type { BookingDate } from './ValueObjects/BookingDate'
import type { Time } from './ValueObjects/Time'
import { BookingCreatedDomainEvent } from './Events/BookingCreatedDomainEvent'
import { BookingDeletedDomainEvent } from './Events/BookingDeletedDomainEvent'

export class Booking extends AggregateRoot {
  constructor (
    readonly id: BookingId,
    readonly productId: ProductId,
    readonly userId: UserId,
    readonly date: BookingDate,
    readonly startTime: Time,
    readonly endTime: Time
  ) {
    super()
  }

  static create (
    id: BookingId,
    productId: ProductId,
    userId: UserId,
    date: BookingDate,
    startTime: Time,
    endTime: Time
  ): Booking {
    const booking = new Booking(id, productId, userId, date, startTime, endTime)
    booking.record(BookingCreatedDomainEvent.fromAggregate(booking))
    return booking
  }

  delete (): Booking {
    const deleted = new Booking(
      this.id,
      this.productId,
      this.userId,
      this.date,
      this.startTime,
      this.endTime
    )
    deleted.record(BookingDeletedDomainEvent.fromAggregate(deleted))
    return deleted
  }
}
