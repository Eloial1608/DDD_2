import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidExceptionTypeError } from '../Errors/InvalidExceptionTypeError'

export enum AvailableExceptionType {
  OVERRIDE = 'override',
  BLOCK = 'block'
}

export class ExceptionType extends EnumValueObject<AvailableExceptionType> {
  constructor (value: AvailableExceptionType) {
    super(value, Object.values(AvailableExceptionType))
  }

  protected throwErrorForInvalidValue (value: AvailableExceptionType): void {
    throw new InvalidExceptionTypeError(value)
  }
}
