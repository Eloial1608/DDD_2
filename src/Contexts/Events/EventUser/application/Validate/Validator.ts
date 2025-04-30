import { EventUserNotFound } from '@Events/EventUser/domain/Errors/EventUserNotFound'
import { EventUserRepository } from '@Events/EventUser/domain/EventUserRepository'
import { Id } from '@Events/EventUser/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Validator {
  constructor (
        private readonly repository: EventUserRepository,
        private readonly eventBus: EventBus
  ) {}

  async run (id: Id) {
    const eventUser = await this.repository.find(id)

    if (!eventUser) throw new EventUserNotFound(id)

    if (eventUser.validatedAt) return

    const updated = eventUser.validate()

    await this.repository.persist(updated)
    await this.eventBus.publish(updated.pullDomainEvents())
  }
}
