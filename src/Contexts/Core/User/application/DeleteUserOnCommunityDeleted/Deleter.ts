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
    let offset = 0

    for (;;) {
      const users = await this.getUsersByCommunityId(communityId, this.LIMIT, offset)

      for (const user of users) {
        const updatedUser = user.delete()

        await this.repository.persist(updatedUser)

        await this.eventBus.publish(updatedUser.pullDomainEvents())
      }

      offset += users.length

      if (users.length !== this.LIMIT) break
    }
  }

  private async getUsersByCommunityId (communityId: CommunityId, limit: number, offset: number) {
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
