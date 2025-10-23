import { UserRepository } from '@Projects/User/domain/UserRepository'
import { Id } from '@Projects/User/domain/ValueObjects/Id'
import { IsAdmin } from '@Projects/User/domain/ValueObjects/IsAdmin'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    isAdmin: IsAdmin
  ) {
    const user = await this.repository.find(id)

    if (!user) return

    const updatedUser = user.updateIsAdmin(isAdmin)

    await this.repository.persist(updatedUser)
    await this.eventBus.publish(updatedUser.pullDomainEvents())
  }
}
