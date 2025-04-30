import { UserRepository } from '@Events/User/domain/UserRepository'
import { Id } from '@Events/User/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Deleter {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id
  ) {
    const user = await this.repository.find(id)

    if (!user) return

    const deleted = user.delete()

    await this.repository.delete(deleted)
    await this.eventBus.publish(deleted.pullDomainEvents())
  }
}
