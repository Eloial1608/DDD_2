import { Id } from '@Core/CommunityConfiguration/domain/ValueObjects/Id'
import { CommunityConfigurationRepository } from '@Core/CommunityConfiguration/domain/CommunityConfigurationRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Core/CommunityConfiguration/domain/ValueObjects/CommunityId'

export class Deleter {
  constructor (private readonly repository: CommunityConfigurationRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId
  ): Promise<void> {
    const existingCommunityConfiguration = await this.repository.find(id)
    if (!existingCommunityConfiguration || existingCommunityConfiguration.communityId!.valueOf() !== communityId.valueOf()) return

    const communityConfiguration = existingCommunityConfiguration.delete()

    await this.repository.persist(communityConfiguration)

    await this.eventBus.publish(communityConfiguration.pullDomainEvents())
  }
}
