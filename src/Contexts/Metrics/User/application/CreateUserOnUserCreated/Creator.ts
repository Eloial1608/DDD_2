import { User } from '@Metrics/User/domain/User'
import { UserRepository } from '@Metrics/User/domain/UserRepository'
import { CommunityId } from '@Metrics/User/domain/ValueObjects/CommunityId'
import { Id } from '@Metrics/User/domain/ValueObjects/Id'
import { IsAdmin } from '@Metrics/User/domain/ValueObjects/IsAdmin'
import { IsOwner } from '@Metrics/User/domain/ValueObjects/IsOwner'
import { MainId } from '@Metrics/User/domain/ValueObjects/MainId'
import { Name } from '@Metrics/User/domain/ValueObjects/Name'
import { Username } from '@Metrics/User/domain/ValueObjects/Username'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Creator {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    mainId: MainId,
    communityId: CommunityId,
    name: Name,
    username: Username,
    isAdmin: IsAdmin,
    isOwner: IsOwner
  ) {
    const user = await this.repository.find(id)

    if (user) return

    const createdUser = User.create(
      id,
      mainId,
      communityId,
      name,
      username,
      isAdmin,
      isOwner
    )

    await this.repository.persist(createdUser)
    await this.eventBus.publish(createdUser.pullDomainEvents())
  }
}
