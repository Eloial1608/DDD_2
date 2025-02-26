import { Space } from '@Threads/Space/domain/Space'
import { SpaceRepository } from '@Threads/Space/domain/SpaceRepository'
import { Accessibility } from '@Threads/Space/domain/ValueObjects/Accessibility'
import { CommunityId } from '@Threads/Space/domain/ValueObjects/CommunityId'
import { Configuration } from '@Threads/Space/domain/ValueObjects/Configuration'
import { Id } from '@Threads/Space/domain/ValueObjects/Id'
import { Type } from '@Threads/Space/domain/ValueObjects/Type'
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
