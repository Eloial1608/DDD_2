import { Space } from '@Marketplace/Space/domain/Space'
import { SpaceRepository } from '@Marketplace/Space/domain/SpaceRepository'
import { Accessibility } from '@Marketplace/Space/domain/ValueObjects/Accessibility'
import { CommunityId } from '@Marketplace/Space/domain/ValueObjects/CommunityId'
import { Configuration } from '@Marketplace/Space/domain/ValueObjects/Configuration'
import { Id } from '@Marketplace/Space/domain/ValueObjects/Id'
import { Type } from '@Marketplace/Space/domain/ValueObjects/Type'
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
