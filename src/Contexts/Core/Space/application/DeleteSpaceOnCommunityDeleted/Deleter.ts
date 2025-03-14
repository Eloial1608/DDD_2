import { SpaceRepository } from '@Core/Space/domain/SpaceRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Shared/domain/SharedValueObjects/Community/CommunityId'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'

export class Deleter {
  constructor (private readonly repository: SpaceRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (
    communityId: CommunityId
  ) {
    for (;;) {
      const spaces = await this.getSpacesByCommunityId(communityId, this.LIMIT)

      for (const space of spaces) {
        const updatedSpace = space.delete()

        await this.repository.persist(updatedSpace)

        await this.eventBus.publish(updatedSpace.pullDomainEvents())
      }

      if (spaces.length !== this.LIMIT) break
    }
  }

  private async getSpacesByCommunityId (communityId: CommunityId, limit: number) {
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
