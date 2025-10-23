import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import type { AvailabilityExceptionId } from './ValueObjects/AvailabilityExceptionId'
import type { ProductId } from './ValueObjects/ProductId'
import type { ExceptionDate } from './ValueObjects/ExceptionDate'
import type { ExceptionType } from './ValueObjects/ExceptionType'
import { AvailabilityExceptionCreatedDomainEvent } from './Events/AvailabilityExceptionCreatedDomainEvent'
import { AvailabilityExceptionUpdatedDomainEvent } from './Events/AvailabilityExceptionUpdatedDomainEvent'
import { AvailabilityExceptionDeletedDomainEvent } from './Events/AvailabilityExceptionDeletedDomainEvent'

export class AvailabilityException extends AggregateRoot {
  constructor (
    readonly id: AvailabilityExceptionId,
    readonly productId: ProductId,
    readonly date: ExceptionDate,
    readonly type: ExceptionType
  ) {
    super()
  }

  static create (
    id: AvailabilityExceptionId,
    productId: ProductId,
    date: ExceptionDate,
    type: ExceptionType
  ): AvailabilityException {
    const exception = new AvailabilityException(id, productId, date, type)
    exception.record(AvailabilityExceptionCreatedDomainEvent.fromAggregate(exception))
    return exception
  }

  update (
    date: ExceptionDate,
    type: ExceptionType
  ): AvailabilityException {
    const updated = new AvailabilityException(
      this.id,
      this.productId,
      date,
      type
    )
    updated.record(AvailabilityExceptionUpdatedDomainEvent.fromAggregate(updated))
    return updated
  }

  delete (): AvailabilityException {
    const deleted = new AvailabilityException(
      this.id,
      this.productId,
      this.date,
      this.type
    )
    deleted.record(AvailabilityExceptionDeletedDomainEvent.fromAggregate(deleted))
    return deleted
  }
}
