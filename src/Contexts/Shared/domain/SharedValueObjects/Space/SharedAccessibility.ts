import { InvalidSpaceAccessibility } from '@Shared/domain/Errors/InvalidSpaceAccessibility'
import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'

export enum AllowedAccessibilities {
    PUBLIC = 'public',
    PRIVATE = 'private',
    PAYMENT = 'payment',
    HIDDEN = 'hidden',
}

export class SharedAccessibility extends EnumValueObject<AllowedAccessibilities> {
  constructor (value: AllowedAccessibilities) {
    super(value, Object.values(AllowedAccessibilities))
  }

  protected throwErrorForInvalidValue (): void {
    throw new InvalidSpaceAccessibility(this)
  }
}
