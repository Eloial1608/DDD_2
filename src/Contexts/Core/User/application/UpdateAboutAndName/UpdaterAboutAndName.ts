import { UserRepository } from '@Core/User/domain/UserRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { About } from '@Core/User/domain/ValueObjects/About'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdaterAboutAndName {
  constructor (
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus
  ) {}

  async run (
    id: Id,
    about: Nullable<About>,
    name: Name
  ) {
    const user = await this.repository.find(id)

    if (!user) throw new UserNotFound(id)

    const updatedUser = user.updateAboutAndName(
      about,
      name
    )

    await this.repository.persist(updatedUser)
    await this.eventBus.publish(updatedUser.pullDomainEvents())
  }
}
