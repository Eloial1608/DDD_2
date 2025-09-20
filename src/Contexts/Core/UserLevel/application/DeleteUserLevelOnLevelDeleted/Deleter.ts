import { UserLevelRepository } from '@Core/UserLevel/domain/UserLevelRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { LevelId } from '@Core/UserLevel/domain/ValueObjects/LevelId'

export class Deleter {
  constructor (private readonly repository: UserLevelRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (
    levelId: LevelId
  ) {
    for (;;) {
      const userlevels = await this.getUserLevelsByLevelId(levelId, this.LIMIT)

      for (const userlevel of userlevels) {
        const updatedUserLevel = userlevel.delete()

        await this.repository.persist(updatedUserLevel)

        await this.eventBus.publish(updatedUserLevel.pullDomainEvents())
      }

      if (userlevels.length !== this.LIMIT) break
    }
  }

  private async getUserLevelsByLevelId (levelId: LevelId, limit: number) {
    const criteria = new Criteria(
      new Filters([
        Filter.simple('levelId', '=', levelId.valueOf())
      ]),
      undefined,
      undefined,
      limit
    )

    return await this.repository.search(criteria)
  }
}
