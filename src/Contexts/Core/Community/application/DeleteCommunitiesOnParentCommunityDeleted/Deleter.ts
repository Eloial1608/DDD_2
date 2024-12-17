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
    for (;;) {
      const communities = await this.getCommunitiesByParentId(id, this.LIMIT)

      for (const community of communities) {
        const updatedCommunity = community.delete()

        await this.repository.persist(updatedCommunity)

        await this.eventBus.publish(updatedCommunity.pullDomainEvents())
      }

      if (communities.length !== this.LIMIT) break
    }
  }

  private async getCommunitiesByParentId (parentId: Id, limit: number) {
    const criteria = new Criteria(
      new Filters([
        Filter.simple('parentId', '=', parentId.valueOf())
      ]),
      undefined,
      undefined,
      limit
    )

    return await this.repository.search(criteria)
  }
}
