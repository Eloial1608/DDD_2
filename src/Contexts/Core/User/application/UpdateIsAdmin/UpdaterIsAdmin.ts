import { UserRepository } from '@Core/User/domain/UserRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { IsAdmin } from '@Core/User/domain/ValueObjects/IsAdmin'
import { CommunityId } from '@Shared/domain/SharedValueObjects/Community/CommunityId'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'

export class UpdaterIsAdmin {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    isAdmin: IsAdmin,
    communityId: CommunityId
  ) {
    const user = await this.repository.find(id)

    if (!user || user.communityId.valueOf() !== communityId.valueOf()) throw new UserNotFound(id)

    const updatedUser = user.updateIsAdmin(
      isAdmin
    )

    await this.repository.persist(updatedUser)
    await this.eventBus.publish(updatedUser.pullDomainEvents())
  }
}
