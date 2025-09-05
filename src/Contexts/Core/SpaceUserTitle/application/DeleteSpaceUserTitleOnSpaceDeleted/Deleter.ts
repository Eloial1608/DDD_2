import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { SpaceUserTitleRepository } from '@Core/SpaceUserTitle/domain/SpaceUserTitleRepository'

export class Deleter {
  constructor (private readonly repository: SpaceUserTitleRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (
    id: Id
  ) {
    for (;;) {
      const spaceUserTitles = await this.getSpaceUserTitlesBySpaceId(id, this.LIMIT)

      for (const spaceUserTitle of spaceUserTitles) {
        const updatedSpaceUserTitle = spaceUserTitle.delete()

        await this.repository.delete(updatedSpaceUserTitle)

        await this.eventBus.publish(updatedSpaceUserTitle.pullDomainEvents())
      }

      if (spaceUserTitles.length !== this.LIMIT) break
    }
  }

  private async getSpaceUserTitlesBySpaceId (id: Id, limit: number) {
    const criteria = new Criteria(
      new Filters([
        Filter.simple('spaceId', '=', id.valueOf())
      ]),
      undefined,
      undefined,
      limit
    )

    return await this.repository.search(criteria)
  }
}
