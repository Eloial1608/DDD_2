import { CommunityConfigurationNotFound } from '@Core/CommunityConfiguration/domain/Errors/CommunityConfigurationNotFound'
import { CommunityConfigurationRepository } from '@Core/CommunityConfiguration/domain/CommunityConfigurationRepository'
import { CommunityId } from '@Core/CommunityConfiguration/domain/ValueObjects/CommunityId'
import { Id } from '@Core/CommunityConfiguration/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { CurrentTheme } from '@Core/CommunityConfiguration/domain/ValueObjects/CurrentTheme'

export class Updater {
  constructor (private readonly repository: CommunityConfigurationRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: Nullable<CommunityId>,
    currentTheme: Nullable<CurrentTheme>
  ) {
    const communityconfiguration = await this.repository.find(id)

    if (!communityconfiguration) throw new CommunityConfigurationNotFound(id)

    const updatedCommunityConfiguration = communityconfiguration.update(
      id,
      communityId,
      currentTheme
    )

    await this.repository.persist(updatedCommunityConfiguration)
    await this.eventBus.publish(updatedCommunityConfiguration.pullDomainEvents())
  }
}
