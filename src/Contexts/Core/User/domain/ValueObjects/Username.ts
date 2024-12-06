import { SlugValueObject } from '@Shared/domain/ValueObjects/SlugValueObject'
import { InvalidUsernameFormat } from '../Errors/InvalidUsernameFormat'

export class Username extends SlugValueObject {
  protected throwErrorForInvalidValue (value: string): void {
    throw new InvalidUsernameFormat(`The username ${value} isn't valid`)
  }
}
