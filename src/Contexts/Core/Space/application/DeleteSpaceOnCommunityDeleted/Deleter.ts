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
    let offset = 0

    for (;;) {
      const spaces = await this.getSpacesByCommunityId(communityId, this.LIMIT, offset)

      for (const space of spaces) {
        const updatedSpace = space.delete()

        await this.repository.persist(updatedSpace)

        await this.eventBus.publish(updatedSpace.pullDomainEvents())
      }

      offset += spaces.length

      if (spaces.length !== this.LIMIT) break
    }
  }

  private async getSpacesByCommunityId (communityId: CommunityId, limit: number, offset: number) {
    const criteria = new Criteria(
      new Filters([
        Filter.simple('communityId', '=', communityId.valueOf())
      ]),
      undefined,
      undefined,
      limit,
      offset
    )

    return await this.repository.search(criteria)
  }
}
