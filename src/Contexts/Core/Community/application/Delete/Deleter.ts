import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
export class Deleter {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (id: Id): Promise<void> {
    const existingCommunity = await this.repository.find(id)

    if (!existingCommunity) return

    const community = existingCommunity.delete()

    await this.repository.persist(community)

    await this.eventBus.publish(community.pullDomainEvents())
  }
}
