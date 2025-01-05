import { SpaceRepository } from '@Media/Space/domain/SpaceRepository'
import { Id } from '@Media/Space/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Deleter {
  constructor (private readonly repository: SpaceRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id
  ) {
    const space = await this.repository.find(id)

    if (!space) return

    const deleted = space.delete()

    await this.repository.delete(deleted)
    await this.eventBus.publish(deleted.pullDomainEvents())
  }
}
