import { UserRepository } from '@Core/User/domain/UserRepository'
import { User } from '@Core/User/domain/User'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { Username } from '../../domain/ValueObjects/Username'

export class FinderByUsername {
  constructor (private readonly repository: UserRepository) {}

  async find (username: Username): Promise<User> {
    const user = await this.repository.findByUsername(username)

    if (!user) throw new UserNotFound(username.value)

    return user
  }
}
