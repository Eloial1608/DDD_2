import { UserRetention } from '@Metrics/UserRetention/domain/UserRetention'
import { UserRetentionRepository } from '@Metrics/UserRetention/domain/UserRetentionRepository'
import { CommunityId } from '@Metrics/UserRetention/domain/ValueObjects/CommunityId'
import { Id } from '@Metrics/UserRetention/domain/ValueObjects/Id'
import { UserId } from '@Metrics/UserRetention/domain/ValueObjects/UserId'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Creator {
  constructor (private readonly repository: UserRetentionRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    userId: UserId,
    communityId: CommunityId
  ) {
    const userretention = await this.repository.find(id)

    if (userretention) return

    const created = UserRetention.create(id, userId, communityId)

    await this.repository.persist(created)
    await this.eventBus.publish(created.pullDomainEvents())
  }
}
