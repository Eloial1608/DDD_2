import { CommunityRepository } from '@Course/Community/domain/CommunityRepository'
import { Id } from '@Course/Community/domain/ValueObjects/Id'
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
