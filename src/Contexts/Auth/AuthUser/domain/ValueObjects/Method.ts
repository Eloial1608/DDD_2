import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidMethod } from '../Errors/InvalidMethod'

export enum ValidMethods {
    PASSWORD = 'PASSWORD',
    GOOGLE = 'GOOGLE'
}

export class Method extends EnumValueObject<ValidMethods> {
  constructor (value: ValidMethods) {
    super(value, Object.values(ValidMethods))
  }

  protected throwErrorForInvalidValue (value: ValidMethods): void {
    throw new InvalidMethod(`The method ${value} isn't valid`)
  }
}
