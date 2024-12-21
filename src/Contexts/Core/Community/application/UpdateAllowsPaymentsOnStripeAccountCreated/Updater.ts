import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { AllowsPayments } from '@Core/Community/domain/ValueObjects/AllowsPayments'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (id: Id): Promise<void> {
    const community = await this.repository.find(id)

    if (!community) return

    const updatedCommunity = community.updateAllowsPayments(
      new AllowsPayments(true)
    )

    await this.repository.persist(updatedCommunity)

    await this.eventBus.publish(updatedCommunity.pullDomainEvents())
  }
}
