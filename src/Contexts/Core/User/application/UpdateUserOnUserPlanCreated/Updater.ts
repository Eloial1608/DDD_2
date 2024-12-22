import { UserRepository } from '@Core/User/domain/UserRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { HasPayed } from '@Core/User/domain/ValueObjects/HasPayed'
export class Updater {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id
  ) {
    const user = await this.repository.find(id)

    if (!user) return

    const updatedUser = user.updateHasPayed(new HasPayed(true))

    await this.repository.persist(updatedUser)
    await this.eventBus.publish(updatedUser.pullDomainEvents())
  }
}
