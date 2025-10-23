import { CommunityConfiguration } from '@Core/CommunityConfiguration/domain/CommunityConfiguration'
import { CommunityConfigurationRepository } from '@Core/CommunityConfiguration/domain/CommunityConfigurationRepository'
import { Id } from '@Core/CommunityConfiguration/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Core/CommunityConfiguration/domain/ValueObjects/CommunityId'
import { Nullable } from '@Shared/domain/Nullable'
import { CurrentTheme } from '@Core/CommunityConfiguration/domain/ValueObjects/CurrentTheme'

export class Creator {
  constructor (private readonly repository: CommunityConfigurationRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: Nullable<CommunityId>,
    currentTheme: Nullable<CurrentTheme>
  ) {
    const communityconfiguration = await this.repository.find(id)

    if (communityconfiguration) return

    const created = CommunityConfiguration.create(id, communityId, currentTheme)

    await this.repository.persist(created)
    await this.eventBus.publish(created.pullDomainEvents())
  }
}
