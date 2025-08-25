import { Community } from '@Metrics/Community/domain/Community'
import { CommunityRepository } from '@Metrics/Community/domain/CommunityRepository'
import { Id } from '@Metrics/Community/domain/ValueObjects/Id'
import { IsPrivate } from '@Metrics/Community/domain/ValueObjects/IsPrivate'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Creator {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    isPrivate: IsPrivate
  ) {
    const community = await this.repository.find(id)

    if (community) return

    const createdCommunity = Community.create(
      id,
      isPrivate
    )

    await this.repository.persist(createdCommunity)
    await this.eventBus.publish(createdCommunity.pullDomainEvents())
  }
}
