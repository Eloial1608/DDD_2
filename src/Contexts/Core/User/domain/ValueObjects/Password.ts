import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject'
import { InvalidPasswordLength } from '../Errors/InvalidPasswordLength'
import * as bcrypt from 'bcrypt'

export class Password extends StringValueObject {
  static Create (password: string): Password {
    if (password.length < 8) {
      throw new InvalidPasswordLength(password)
    }
    return new Password(password)
  }

  async comparePassword (plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.valueOf())
  }
}

export async function encryptPassword (password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}