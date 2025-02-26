import { SpaceRepository } from '@Threads/Space/domain/SpaceRepository'
import { Accessibility } from '@Threads/Space/domain/ValueObjects/Accessibility'
import { Configuration } from '@Threads/Space/domain/ValueObjects/Configuration'
import { Id } from '@Threads/Space/domain/ValueObjects/Id'
import { Type } from '@Threads/Space/domain/ValueObjects/Type'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: SpaceRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    accessibility: Accessibility,
    configuration: Configuration,
    type: Type
  ) {
    const space = await this.repository.find(id)

    if (!space) return

    const updated = space.update(
      accessibility,
      configuration,
      type
    )

    await this.repository.persist(updated)
    await this.eventBus.publish(updated.pullDomainEvents())
  }
}
