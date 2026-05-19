import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { UserRepository } from '@Core/User/domain/UserRepository'
import { Id } from '@Core/User/domain/ValueObjects/Id'

export class Deleter {
  constructor (private readonly repository: UserRepository) {}

  async run (id: Id) {
    
    const user = await this.repository.find(id)

    if (!user) throw new UserNotFound(id)

    const deletedUser = user.delete()

    await this.repository.persist(deletedUser)
  }
}