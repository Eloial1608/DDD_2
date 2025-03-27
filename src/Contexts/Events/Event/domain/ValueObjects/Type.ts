import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidType } from '../Errors/InvalidType'

export enum EventTypes {
    STREAMING = 'STREAMING',
    CALL = 'CALL'
}

export class Type extends EnumValueObject<EventTypes> {
  constructor (type: EventTypes) {
    super(type, Object.values(EventTypes))
  }

  protected throwErrorForInvalidValue (value: EventTypes): void {
    throw new InvalidType(this)
  }
}
