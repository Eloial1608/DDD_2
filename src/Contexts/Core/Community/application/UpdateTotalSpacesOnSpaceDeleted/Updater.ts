import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { SpacesCount } from '@Core/Community/domain/ValueObjects/SpacesCount'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, num: number): Promise<void> {
    const community = await this.repository.find(id)

    if (!community) return

    const updatedCommunity = community.updateSpacesCount(
      new SpacesCount(
        community.spacesCount.valueOf() + num
      )
    )

    await this.repository.persist(updatedCommunity)

    await this.eventBus.publish(updatedCommunity.pullDomainEvents())
  }
}
