import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { HasRegisterForm } from '@Core/Community/domain/ValueObjects/HasRegisterForm'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, hasForm: HasRegisterForm): Promise<void> {
    const community = await this.repository.find(id)

    if (!community) return

    const updatedCommunity = community.updateRegisterForm(
      hasForm,
      null
    )

    await this.repository.persist(updatedCommunity)

    await this.eventBus.publish(updatedCommunity.pullDomainEvents())
  }
}
