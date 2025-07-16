import type { ActionRepository } from '@Marketplace/Action/domain/ActionRepository'
import type { Id } from '@Marketplace/Action/domain/ValueObjects/Id'
import type { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Deleter {
  constructor (
        private readonly repository: ActionRepository,
        private readonly eventBus: EventBus
  ) {}

  async run (
    id: Id
  ) {
    const action = await this.repository.find(id)

    if (!action) return

    const deleted = action.delete()

    await this.repository.delete(deleted)

    await this.eventBus.publish(deleted.pullDomainEvents())
  }
}
