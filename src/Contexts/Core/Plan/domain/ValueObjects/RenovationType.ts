import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidRenovationTypeValue } from '../Errors/InvalidRenovationTypeValue'

export enum RenovationTypeValues {
    MONTH = 'month',
    YEAR = 'year'
}

export class RenovationType extends EnumValueObject<RenovationTypeValues> {
  constructor (value: RenovationTypeValues) {
    super(value, Object.values(RenovationTypeValues))
  }

  protected throwErrorForInvalidValue (value: RenovationTypeValues): void {
    throw new InvalidRenovationTypeValue(value)
  }
}
