import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { EventsUser } from '@Events/EventsUser/domain/EventsUser'
import { EventsUserRepository } from '@Events/EventsUser/domain/EventsUserRepository'
import { Id } from '@Events/EventsUser/domain/ValueObjects/Id'
import { UserId } from '@Events/EventsUser/domain/ValueObjects/UserId'
import { EventsId } from '@Events/EventsUser/domain/ValueObjects/EventsId'

export class Creator {
  constructor (private readonly repository: EventsUserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    userId: UserId,
    eventsId: EventsId
  ) {
    const eventsUser = EventsUser.create(
      id,
      userId,
      eventsId
    )

    await this.repository.persist(eventsUser)
    await this.eventBus.publish(eventsUser.pullDomainEvents())
  }
}
