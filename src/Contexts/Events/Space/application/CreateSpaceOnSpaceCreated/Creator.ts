import { Space } from '@Events/Space/domain/Space'
import { SpaceRepository } from '@Events/Space/domain/SpaceRepository'
import { Accessibility } from '@Events/Space/domain/ValueObjects/Accessibility'
import { CommunityId } from '@Events/Space/domain/ValueObjects/CommunityId'
import { Configuration } from '@Events/Space/domain/ValueObjects/Configuration'
import { Id } from '@Events/Space/domain/ValueObjects/Id'
import { Type } from '@Events/Space/domain/ValueObjects/Type'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Creator {
  constructor (private readonly repository: SpaceRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    accessibility: Accessibility,
    configuration: Configuration,
    type: Type
  ) {
    const space = await this.repository.find(id)

    if (space) return

    const createdSpace = Space.create(
      id,
      communityId,
      accessibility,
      configuration,
      type
    )

    await this.repository.persist(createdSpace)
    await this.eventBus.publish(createdSpace.pullDomainEvents())
  }
}
