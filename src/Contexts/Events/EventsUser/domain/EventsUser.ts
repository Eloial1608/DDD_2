import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { EventsId } from './ValueObjects/EventsId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'
import { EventsUserCreatedDomainEvent } from './Events/EventsUserCreatedDomainEvent'

export class EventsUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly eventsId: EventsId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    userId: UserId,
    eventsId: EventsId
  ): EventsUser {
    const eventsUser = new EventsUser(
      id,
      userId,
      eventsId,
      new CreatedAt(new Date())
    )

    eventsUser.record(EventsUserCreatedDomainEvent.fromAggregate(eventsUser))

    return eventsUser
  }
}
