import { UserTitleRepository } from '@Core/UserTitle/domain/UserTitleRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Shared/domain/SharedValueObjects/Community/CommunityId'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'

export class Deleter {
  constructor (private readonly repository: UserTitleRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (
    communityId: CommunityId
  ) {
    for (;;) {
      const userTitles = await this.getUserTitlesByCommunityId(communityId, this.LIMIT)

      for (const userTitle of userTitles) {
        const updatedUserTitle = userTitle.delete()

        await this.repository.persist(updatedUserTitle)

        await this.eventBus.publish(updatedUserTitle.pullDomainEvents())
      }

      if (userTitles.length !== this.LIMIT) break
    }
  }

  private async getUserTitlesByCommunityId (communityId: CommunityId, limit: number) {
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
