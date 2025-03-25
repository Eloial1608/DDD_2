import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { EventsUser } from '@Events/EventsUser/domain/EventsUser'
import { EventsUserRepository } from '@Events/EventsUser/domain/EventsUserRepository'
import { Id } from '@Events/EventsUser/domain/ValueObjects/Id'
import { UserId } from '@Events/EventsUser/domain/ValueObjects/UserId'
import { EventId } from '@Events/EventsUser/domain/ValueObjects/EventId'

export class Creator {
  constructor (private readonly repository: EventsUserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    userId: UserId,
    eventId: EventId
  ) {
    const eventsUser = EventsUser.create(
      id,
      userId,
      eventId
    )

    await this.repository.persist(eventsUser)
    await this.eventBus.publish(eventsUser.pullDomainEvents())
  }
}
