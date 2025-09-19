import { LevelRepository } from '@Core/Level/domain/LevelRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Shared/domain/SharedValueObjects/Community/CommunityId'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'

export class Deleter {
  constructor (private readonly repository: LevelRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (
    communityId: CommunityId
  ) {
    for (;;) {
      const levels = await this.getLevelsByCommunityId(communityId, this.LIMIT)

      for (const level of levels) {
        const updatedLevel = level.delete()

        await this.repository.persist(updatedLevel)

        await this.eventBus.publish(updatedLevel.pullDomainEvents())
      }

      if (levels.length !== this.LIMIT) break
    }
  }

  private async getLevelsByCommunityId (communityId: CommunityId, limit: number) {
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
