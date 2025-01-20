import { SpaceRepository } from '@Course/Space/domain/SpaceRepository'
import { Accessibility } from '@Course/Space/domain/ValueObjects/Accessibility'
import { Configuration } from '@Course/Space/domain/ValueObjects/Configuration'
import { Id } from '@Course/Space/domain/ValueObjects/Id'
import { Type } from '@Course/Space/domain/ValueObjects/Type'
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
