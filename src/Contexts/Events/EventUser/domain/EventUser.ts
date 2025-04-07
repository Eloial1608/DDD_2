import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { EventId } from './ValueObjects/EventId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'
import { EventUserCreatedDomainEvent } from './Events/EventUserCreatedDomainEvent'
import { IsOnSite } from './ValueObjects/IsOnSite'
import { IsOnline } from './ValueObjects/IsOnline'
import { TicketId } from './ValueObjects/TicketId'
import { Nullable } from '@Shared/domain/Nullable'
import { ValidatedAt } from './ValueObjects/ValidatedAt'
import { EventUserValidatedDomainEvent } from './Events/EventUserValidatedDomainEvent'

export class EventUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly eventId: EventId,
        readonly isOnline: IsOnline,
        readonly isOnSite: IsOnSite,
        readonly ticketId: TicketId,
        readonly validatedAt: Nullable<ValidatedAt>,
        readonly createdAt: CreatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    userId: UserId,
    eventId: EventId,
    isOnline: IsOnline,
    isOnSite: IsOnSite,
    ticketId: TicketId
  ): EventUser {
    const eventUser = new EventUser(
      id,
      userId,
      eventId,
      isOnline,
      isOnSite,
      ticketId,
      null,
      new CreatedAt(new Date())
    )

    eventUser.record(EventUserCreatedDomainEvent.fromAggregate(eventUser))

    return eventUser
  }

  validate (): EventUser {
    const eventUser = new EventUser(
      this.id,
      this.userId,
      this.eventId,
      this.isOnline,
      this.isOnSite,
      this.ticketId,
      new ValidatedAt(new Date()),
      this.createdAt
    )

    eventUser.record(EventUserValidatedDomainEvent.fromAggregate(eventUser))

    return eventUser
  }
}
