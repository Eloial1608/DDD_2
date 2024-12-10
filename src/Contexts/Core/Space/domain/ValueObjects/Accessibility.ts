import { InvalidAccessibility } from '@Core/Space/domain/Errors/InvalidAccessibility'
import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'

export enum AllowedAccessibilities {
    PUBLIC = 'public',
    PRIVATE = 'private',
    PAYMENT = 'payment',
    HIDDEN = 'hidden',
}

export class Accessibility extends EnumValueObject<AllowedAccessibilities> {
  constructor (value: AllowedAccessibilities) {
    super(value, Object.values(AllowedAccessibilities))
  }

  protected throwErrorForInvalidValue (): void {
    throw new InvalidAccessibility(this)
  }
}
