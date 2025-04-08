import { Community } from '@Chat/Community/domain/Community'
import { CommunityRepository } from '@Chat/Community/domain/CommunityRepository'
import { Id } from '@Chat/Community/domain/ValueObjects/Id'
import { IsPrivate } from '@Chat/Community/domain/ValueObjects/IsPrivate'
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
