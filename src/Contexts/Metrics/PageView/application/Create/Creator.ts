import { PageView } from '@Metrics/PageView/domain/PageView'
import { PageViewRepository } from '@Metrics/PageView/domain/PageViewRepository'
import { CommunityId } from '@Metrics/PageView/domain/ValueObjects/CommunityId'
import { Id } from '@Metrics/PageView/domain/ValueObjects/Id'
import { SpaceID } from '@Metrics/PageView/domain/ValueObjects/SpaceId'
import { UserId } from '@Metrics/PageView/domain/ValueObjects/UserId'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Creator {
  constructor (private readonly repository: PageViewRepository, private readonly eventBus: EventBus) {}

  async run (id : Id, userId: UserId, communityId: CommunityId, spaceId: SpaceID) {
    const existing = await this.repository.find(id)

    if (existing) return

    const pageview = PageView.create(
      id,
      userId,
      communityId,
      spaceId
    )

    await this.repository.persist(pageview)
    await this.eventBus.publish(pageview.pullDomainEvents())
  }
}
