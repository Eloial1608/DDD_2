import { UserRepository } from '@Metrics/User/domain/UserRepository'
import { Id } from '@Metrics/User/domain/ValueObjects/Id'
import { Name } from '@Metrics/User/domain/ValueObjects/Name'
import { Username } from '@Metrics/User/domain/ValueObjects/Username'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    name: Name,
    username: Username
  ) {
    const user = await this.repository.find(id)

    if (!user) return

    const updatedUser = user.update(
      name,
      username
    )

    await this.repository.persist(updatedUser)
    await this.eventBus.publish(updatedUser.pullDomainEvents())
  }
}
