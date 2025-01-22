import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { ParentId } from '@Core/Community/domain/ValueObjects/ParentId'
import { SubcommunitiesCount } from '@Core/Community/domain/ValueObjects/SubcommunitiesCount'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (parentId: ParentId, num: number): Promise<void> {
    const community = await this.repository.find(parentId)

    if (!community) return

    const updatedCommunity = community.updateSubcommunitiesCount(
      new SubcommunitiesCount(
        community.subcommunitiesCount.valueOf() + num
      )
    )

    await this.repository.persist(updatedCommunity)

    await this.eventBus.publish(updatedCommunity.pullDomainEvents())
  }
}
