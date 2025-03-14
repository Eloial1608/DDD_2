import { UserRepository } from '@Core/User/domain/UserRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Shared/domain/SharedValueObjects/Community/CommunityId'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'

export class Deleter {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (
    communityId: CommunityId
  ) {
    for (;;) {
      const users = await this.getUsersByCommunityId(communityId, this.LIMIT)

      for (const user of users) {
        const updatedUser = user.delete()

        await this.repository.persist(updatedUser)

        await this.eventBus.publish(updatedUser.pullDomainEvents())
      }

      if (users.length !== this.LIMIT) break
    }
  }

  private async getUsersByCommunityId (communityId: CommunityId, limit: number) {
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
