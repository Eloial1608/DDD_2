import { CommunityConfigurationRepository } from '@Core/CommunityConfiguration/domain/CommunityConfigurationRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Shared/domain/SharedValueObjects/Community/CommunityId'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'

export class Deleter {
  constructor (
    private readonly repository: CommunityConfigurationRepository,
    private readonly eventBus: EventBus
  ) {}

  async run (communityId: CommunityId) {
    const criteria = new Criteria(
      new Filters([
        Filter.simple('communityId', '=', communityId.valueOf())
      ]),
      undefined,
      undefined,
      1
    )

    const [communityConfiguration] = await this.repository.search(criteria)

    if (!communityConfiguration) return

    const deletedCommunityConfiguration = communityConfiguration.delete()

    await this.repository.persist(deletedCommunityConfiguration)
    await this.eventBus.publish(deletedCommunityConfiguration.pullDomainEvents())
  }
}
