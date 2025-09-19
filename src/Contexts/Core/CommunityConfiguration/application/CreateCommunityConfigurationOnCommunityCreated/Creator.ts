import { CommunityConfiguration } from '@Core/CommunityConfiguration/domain/CommunityConfiguration'
import { CommunityConfigurationRepository } from '@Core/CommunityConfiguration/domain/CommunityConfigurationRepository'
import { CommunityId } from '@Core/CommunityConfiguration/domain/ValueObjects/CommunityId'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Uuid } from '@Shared/domain/ValueObjects/Uuid'

export class Creator {
  constructor (private readonly repository: CommunityConfigurationRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 1

  async run (communityId: CommunityId): Promise<void> {
    const communityConf = await this.getCommConfWithCommunityId(communityId, this.LIMIT)

    if (communityConf.length > 0) return

    const id = Uuid.random()

    const newCommunityConf = CommunityConfiguration.create(id, communityId, null)

    await this.repository.persist(newCommunityConf)

    await this.eventBus.publish(newCommunityConf.pullDomainEvents())
  }

  private async getCommConfWithCommunityId (communityId: CommunityId, limit: number) {
    const criteria = new Criteria(
      new Filters([
        Filter.simple('communityId', '=', communityId.valueOf())
      ]),
      undefined,
      undefined,
      limit
    )

    return await this.repository.search(criteria)
  }
}
