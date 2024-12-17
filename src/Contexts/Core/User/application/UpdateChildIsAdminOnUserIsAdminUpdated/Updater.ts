import { UserRepository } from '@Core/User/domain/UserRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Shared/domain/SharedValueObjects/Community/CommunityId'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { MainId } from '@Core/User/domain/ValueObjects/MainId'
import { IsAdmin } from '@Core/User/domain/ValueObjects/IsAdmin'
import { FindCommunitiesByCriteriaQuery } from '@Core/Community/application/FindByCriteria/FindCommunitiesByCriteriaQuery'
import { CommunityCollectionResponse } from '@Core/Community/application/CommunityCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'

export class Updater {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  private readonly LIMIT = 50

  async run (
    mainId: MainId,
    communityId: CommunityId,
    isAdmin: IsAdmin
  ) {
    let offset = 0

    for (;;) {
      const communities = await this.getCommunitiesByParentId(communityId, this.LIMIT, offset)

      for (const community of communities) {
        const user = await this.getUserByMainIdAndCommunityId(mainId, community.id)

        if (!user) continue

        const updatedUser = user.updateIsAdmin(isAdmin)

        await this.repository.persist(updatedUser)

        await this.eventBus.publish(updatedUser.pullDomainEvents())
      }

      if (communities.length !== this.LIMIT) break

      offset += communities.length
    }
  }

  private async getCommunitiesByParentId (parentId: CommunityId, offset: number, limit: number) {
    const query = new FindCommunitiesByCriteriaQuery(
      [
        new Map<string, string>([
          ['field', 'parentId'],
          ['operator', '='],
          ['value', parentId.valueOf()]
        ])
      ],
      undefined,
      undefined,
      undefined,
      limit,
      offset
    )

    return (await this.queryBus.ask<CommunityCollectionResponse>(query)).response
  }

  private async getUserByMainIdAndCommunityId (mainId: MainId, communityId: string) {
    const criteria = new Criteria(
      new Filters([
        Filter.simple('mainId', '=', mainId.valueOf()),
        Filter.simple('communityId', '=', communityId.valueOf())
      ])
    )

    return (await this.repository.search(criteria)).pop()
  }
}
