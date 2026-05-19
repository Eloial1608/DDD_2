import { UserRepository } from '@Core/User/domain/UserRepository'
import { User } from '@Core/User/domain/User'
import { EmailNotFound } from '@Core/User/domain/Errors/EmailNotFound'
import { Email } from '@Core/User/domain/ValueObjects/Email'


export class FinderByEmail {
  constructor (private readonly repository: UserRepository) {}

  async find (email: Email): Promise<User> {
    const user = await this.repository.findByEmail(email)

    if (!user) throw new EmailNotFound(email)

    return user
  }
}