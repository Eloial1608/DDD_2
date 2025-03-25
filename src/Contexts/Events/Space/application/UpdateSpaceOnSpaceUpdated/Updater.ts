import { SpaceRepository } from '@Events/Space/domain/SpaceRepository'
import { Accessibility } from '@Events/Space/domain/ValueObjects/Accessibility'
import { Configuration } from '@Events/Space/domain/ValueObjects/Configuration'
import { Id } from '@Events/Space/domain/ValueObjects/Id'
import { Type } from '@Events/Space/domain/ValueObjects/Type'
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
