import { SpaceRepository } from '@Core/Space/domain/SpaceRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Id } from '@Core/Space/domain/ValueObjects/Id'

export class Deleter {
  constructor (private readonly repository: SpaceRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (
    id: Id
  ) {
    for (;;) {
      const spaces = await this.getSpacesByParentId(id, this.LIMIT)

      for (const space of spaces) {
        const updatedSpace = space.delete()

        await this.repository.persist(updatedSpace)

        await this.eventBus.publish(updatedSpace.pullDomainEvents())
      }

      if (spaces.length !== this.LIMIT) break
    }
  }

  private async getSpacesByParentId (id: Id, limit: number) {
    const criteria = new Criteria(
      new Filters([
        Filter.simple('parentId', '=', id.valueOf())
      ]),
      undefined,
      undefined,
      limit
    )

    return await this.repository.search(criteria)
  }
}
