import { UserTitleRepository } from '@Core/UserTitle/domain/UserTitleRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { TitleId } from '@Core/UserTitle/domain/ValueObjects/TitleId'

export class Deleter {
  constructor (private readonly repository: UserTitleRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (
    titleId: TitleId
  ) {
    for (;;) {
      const userTitles = await this.getUserTitlesByTitleId(titleId, this.LIMIT)

      for (const userTitle of userTitles) {
        const deletedUserTitle = userTitle.delete()

        await this.repository.persist(deletedUserTitle)

        await this.eventBus.publish(deletedUserTitle.pullDomainEvents())
      }

      if (userTitles.length !== this.LIMIT) break
    }
  }

  private async getUserTitlesByTitleId (titleId: TitleId, limit: number) {
    const criteria = new Criteria(
      new Filters([
        Filter.simple('titleId', '=', titleId.valueOf())
      ]),
      undefined,
      undefined,
      limit
    )

    return await this.repository.search(criteria)
  }
}
