import { UserRepository } from '@Core/User/domain/UserRepository'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { Password } from '@Core/User/domain/ValueObjects/Password'

export class UpdatePassword {
  constructor (readonly repository: UserRepository) {}

  async run (
    id: Id,
    password: Password
  ) {
    const user = await this.repository.find(id)

    if (!user) throw new UserNotFound(id)

    const updatedUser = user.updatePassword(
      password
    )

    await this.repository.persist(updatedUser)
  }
}
