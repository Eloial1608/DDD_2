import { UserRepository } from '@Core/User/domain/UserRepository'
import { IsAdmin } from '@Core/User/domain/ValueObjects/IsAdmin'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'

export class UpdaterIsAdmin {
  constructor (private readonly repository: UserRepository) {}

  async run (
    id: Id,
    isAdmin: IsAdmin
  ) {
    const user = await this.repository.find(id)

    if (!user) throw new UserNotFound(id)

    const updatedUser = user.updateIsAdmin(
      isAdmin
    )

    await this.repository.persist(updatedUser)
  }
}
