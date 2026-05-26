import { UserRepository } from '@Core/User/domain/UserRepository'
import { User } from '@Core/User/domain/User'
import { PhoneNumberNotFound } from '@Core/User/domain/Errors/PhoneNumberNotFound'
import { PhoneNumber } from '../../domain/ValueObjects/PhoneNumber'

export class FinderByPhoneNumber {
  constructor (private readonly repository: UserRepository) {}

  async find (phoneNumber: PhoneNumber): Promise<User> {
    const user = await this.repository.findPhoneNumber(phoneNumber)

    if (!user) throw new PhoneNumberNotFound(phoneNumber)

    return user
  }
}