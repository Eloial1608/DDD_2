import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidAccessibility } from './Errors/InvalidAccessibility'

export enum ALLOWED_ACCESSIBILITIES {
    PUBLIC = 'public',
    PRIVATE = 'private',
    PAYMENT = 'payment',
    HIDDEN = 'hidden',
}

export class EntityAccessibility extends EnumValueObject<ALLOWED_ACCESSIBILITIES> {
  constructor (value: ALLOWED_ACCESSIBILITIES) {
    super(value, Object.values(ALLOWED_ACCESSIBILITIES))
  }

  protected throwErrorForInvalidValue (value: ALLOWED_ACCESSIBILITIES): void {
    throw new InvalidAccessibility(this)
  }
}

