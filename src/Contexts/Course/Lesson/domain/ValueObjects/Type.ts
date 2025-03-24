import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidType } from '../Errors/InvalidType'
import { AllowedTypes } from './AllowedTypes'

export class Type extends EnumValueObject<AllowedTypes> {
  constructor (value: AllowedTypes) {
    super(value, Object.values(AllowedTypes))
  }

  protected throwErrorForInvalidValue (): void {
    throw new InvalidType(this)
  }
}
