import { Space } from '@Metrics/Space/domain/Space'
import { SpaceRepository } from '@Metrics/Space/domain/SpaceRepository'
import { CommunityId } from '@Metrics/Space/domain/ValueObjects/CommunityId'
import { Id } from '@Metrics/Space/domain/ValueObjects/Id'
import { Type } from '@Metrics/Space/domain/ValueObjects/Type'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Creator {
  constructor (private readonly repository: SpaceRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    type: Type
  ) {
    const space = await this.repository.find(id)

    if (space) return

    const createdSpace = Space.create(
      id,
      communityId,
      type
    )

    await this.repository.persist(createdSpace)
    await this.eventBus.publish(createdSpace.pullDomainEvents())
  }
}
