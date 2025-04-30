import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidAccessibility } from '../Errors/InvalidAccessibility'

export enum EventAccessibilities {
    ONLINE = 'ONLINE',
    ONSITE = 'ONSITE',
    HYBRID = 'HYBRID'
}

export class Accessibility extends EnumValueObject<EventAccessibilities> {
  constructor (accessibility: EventAccessibilities) {
    super(accessibility, Object.values(EventAccessibilities))
  }

  protected throwErrorForInvalidValue (value: EventAccessibilities): void {
    throw new InvalidAccessibility(this)
  }
}
