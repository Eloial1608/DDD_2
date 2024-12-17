import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
export class Deleter {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (id: Id): Promise<void> {
    let offset = 0

    for (;;) {
      const communities = await this.getCommunitiesByParentId(id, this.LIMIT, offset)

      for (const community of communities) {
        const updatedCommunity = community.delete()

        await this.repository.persist(updatedCommunity)

        await this.eventBus.publish(updatedCommunity.pullDomainEvents())
      }

      if (communities.length !== this.LIMIT) break

      offset += communities.length
    }
  }

  private async getCommunitiesByParentId (parentId: Id, offset: number, limit: number) {
    const criteria = new Criteria(
      new Filters([
        Filter.simple('parentId', '=', parentId.valueOf())
      ]),
      undefined,
      undefined,
      limit,
      offset
    )

    return await this.repository.search(criteria)
  }
}
