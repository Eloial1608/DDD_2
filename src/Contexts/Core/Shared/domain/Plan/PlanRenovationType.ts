import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidRenovationTypeValue } from './Errors/InvalidRenovationTypeValue'

export enum PlanRenovationTypeValues {
    MONTH = 'month',
    YEAR = 'year'
}

export class PlanRenovationType extends EnumValueObject<PlanRenovationTypeValues> {
  constructor (value: PlanRenovationTypeValues) {
    super(value, Object.values(PlanRenovationTypeValues))
  }

  protected throwErrorForInvalidValue (value: PlanRenovationTypeValues): void {
    throw new InvalidRenovationTypeValue(value)
  }
}
