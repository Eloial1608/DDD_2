import { UserLevelRepository } from '@Core/UserLevel/domain/UserLevelRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Shared/domain/SharedValueObjects/Community/CommunityId'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'

export class Deleter {
  constructor (private readonly repository: UserLevelRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (
    communityId: CommunityId
  ) {
    for (;;) {
      const userlevels = await this.getUserLevelsByCommunityId(communityId, this.LIMIT)

      for (const userlevel of userlevels) {
        const updatedUserLevel = userlevel.delete()

        await this.repository.persist(updatedUserLevel)

        await this.eventBus.publish(updatedUserLevel.pullDomainEvents())
      }

      if (userlevels.length !== this.LIMIT) break
    }
  }

  private async getUserLevelsByCommunityId (communityId: CommunityId, limit: number) {
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
