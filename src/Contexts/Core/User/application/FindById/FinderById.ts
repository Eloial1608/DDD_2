import { UserRepository } from '@Core/User/domain/UserRepository'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { User } from '@Core/User/domain/User'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'

export class FinderById {
  constructor (private readonly repository: UserRepository) {}

  async find (id: Id): Promise<User> {
    const user = await this.repository.find(id)

    if (!user) throw new UserNotFound(id)

    return user
  }
}
