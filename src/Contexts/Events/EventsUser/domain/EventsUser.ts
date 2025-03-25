import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { EventId } from './ValueObjects/EventId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'
import { EventsUserCreatedDomainEvent } from './Events/EventsUserCreatedDomainEvent'

export class EventsUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly eventId: EventId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    userId: UserId,
    eventId: EventId
  ): EventsUser {
    const eventsUser = new EventsUser(
      id,
      userId,
      eventId,
      new CreatedAt(new Date())
    )

    eventsUser.record(EventsUserCreatedDomainEvent.fromAggregate(eventsUser))

    return eventsUser
  }
}
