import { Space } from '@Chat/Space/domain/Space'
import { SpaceRepository } from '@Chat/Space/domain/SpaceRepository'
import { Accessibility } from '@Chat/Space/domain/ValueObjects/Accessibility'
import { CommunityId } from '@Chat/Space/domain/ValueObjects/CommunityId'
import { Configuration } from '@Chat/Space/domain/ValueObjects/Configuration'
import { Id } from '@Chat/Space/domain/ValueObjects/Id'
import { Type } from '@Chat/Space/domain/ValueObjects/Type'
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
