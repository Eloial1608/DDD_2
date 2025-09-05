import { SpaceUserTitleRepository } from '@Core/SpaceUserTitle/domain/SpaceUserTitleRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Shared/domain/SharedValueObjects/Community/CommunityId'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'

export class Deleter {
  constructor (private readonly repository: SpaceUserTitleRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (
    communityId: CommunityId
  ) {
    for (;;) {
      const spaceUserTitles = await this.getSpaceUserTitlesByCommunityId(communityId, this.LIMIT)

      for (const spaceUserTitle of spaceUserTitles) {
        const updatedSpaceUserTitle = spaceUserTitle.delete()

        await this.repository.delete(updatedSpaceUserTitle)

        await this.eventBus.publish(updatedSpaceUserTitle.pullDomainEvents())
      }

      if (spaceUserTitles.length !== this.LIMIT) break
    }
  }

  private async getSpaceUserTitlesByCommunityId (communityId: CommunityId, limit: number) {
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
