import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject'
import { InvalidNameLength } from '../Errors/InvalidNameLength'

export class Name extends StringValueObject {
  value: any
  constructor (value: string) {
    super(value)
    this.checkifItsValid(value)
  }

  private checkifItsValid (value: string): void {
    if (value.length < 3) throw new InvalidNameLength(value)
  }
}
