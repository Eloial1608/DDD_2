import { SlugValueObject } from '@Shared/domain/ValueObjects/SlugValueObject'
import { InvalidUsernameFormat } from '../Errors/InvalidUsernameFormat'
import { SlugFactory } from '@Shared/domain/SlugFactory'

export class Username extends SlugValueObject {
  value: any
  protected throwErrorForInvalidValue (value: string): void {
    throw new InvalidUsernameFormat(`The username ${value} isn't valid`)
  }

  static createFromNonSlug (username: string): Username {
    return new Username(
      SlugFactory.create(username)
    )
  }
}