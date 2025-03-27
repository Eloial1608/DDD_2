import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { EventId } from './ValueObjects/EventId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'
import { EventUserCreatedDomainEvent } from './Events/EventUserCreatedDomainEvent'
import { IsOnSite } from './ValueObjects/IsOnSite'
import { IsOnline } from './ValueObjects/IsOnline'
import { TicketId } from './ValueObjects/TicketId'

export class EventUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly eventId: EventId,
        readonly isOnline: IsOnline,
        readonly isOnSite: IsOnSite,
        readonly ticketId: TicketId,
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
      new CreatedAt(new Date())
    )

    eventUser.record(EventUserCreatedDomainEvent.fromAggregate(eventUser))

    return eventUser
  }
}
