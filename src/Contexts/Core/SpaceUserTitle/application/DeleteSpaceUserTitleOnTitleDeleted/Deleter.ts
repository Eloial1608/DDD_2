import { SpaceUserTitleRepository } from '@Core/SpaceUserTitle/domain/SpaceUserTitleRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { TitleId } from '@Core/SpaceUserTitle/domain/ValueObjects/TitleId'

export class Deleter {
  constructor (private readonly repository: SpaceUserTitleRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (
    titleId: TitleId
  ) {
    for (;;) {
      const spaceUserTitles = await this.getSpaceUserTitlesByTitleId(titleId, this.LIMIT)

      for (const spaceUserTitle of spaceUserTitles) {
        const updatedSpaceUserTitle = spaceUserTitle.delete()

        await this.repository.persist(updatedSpaceUserTitle)

        await this.eventBus.publish(updatedSpaceUserTitle.pullDomainEvents())
      }

      if (spaceUserTitles.length !== this.LIMIT) break
    }
  }

  private async getSpaceUserTitlesByTitleId (titleId: TitleId, limit: number) {
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
