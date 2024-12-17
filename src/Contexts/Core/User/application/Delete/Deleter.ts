import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { UserRepository } from '@Core/User/domain/UserRepository'
import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Deleter {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, communityId: CommunityId) {
    const user = await this.repository.find(id)

    if (!user || user.communityId.valueOf() !== communityId.valueOf()) throw new UserNotFound(id)

    const deletedUser = user.delete()

    await this.repository.persist(deletedUser)
    await this.eventBus.publish(deletedUser.pullDomainEvents())
  }
}
