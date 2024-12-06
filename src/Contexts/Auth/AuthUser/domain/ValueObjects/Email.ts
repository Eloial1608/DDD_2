import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject'
import { InvalidEmailFormat } from '../Errors/InvalidEmailFormat'

export class Email extends StringValueObject {
  constructor (value: string) {
    super(value)

    this.checkIfItsValid(value)
  }

  private checkIfItsValid (value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(value)) throw new InvalidEmailFormat(`The email ${value} doesn't has a valid format`)
  }
}
