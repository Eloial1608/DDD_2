import { SpaceRepository } from '@Projects/Space/domain/SpaceRepository'
import { Accessibility } from '@Projects/Space/domain/ValueObjects/Accessibility'
import { Configuration } from '@Projects/Space/domain/ValueObjects/Configuration'
import { Id } from '@Projects/Space/domain/ValueObjects/Id'
import { Type } from '@Projects/Space/domain/ValueObjects/Type'
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
