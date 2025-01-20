import { AllowedTypes } from '@Shared/domain/SharedValueObjects/Space/AllowedTypes'
import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject'
import { InvalidType } from '../Errors/InvalidType'

export class Type extends StringValueObject {
  constructor (value: string) {
    if (value !== AllowedTypes.COURSES) throw new InvalidType(value)
    super(value)
  }
}
