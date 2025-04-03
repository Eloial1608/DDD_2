import { CommunityRepository } from '@Events/Community/domain/CommunityRepository'
import { Id } from '@Events/Community/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Deleter {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id
  ) {
    const community = await this.repository.find(id)

    if (!community) return

    const deleted = community.delete()

    await this.repository.delete(deleted)
    await this.eventBus.publish(deleted.pullDomainEvents())
  }
}
