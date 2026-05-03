import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject'
import { InvalidPasswordLength } from '../Errors/InvalidPasswordLength'

export class Password extends StringValueObject {
  value: any
  static Create (password: string): Password {

    console.log(password.length)
    if (password.length < 8) {
      throw new InvalidPasswordLength(password)
    }

    return new Password(password)
  }
}