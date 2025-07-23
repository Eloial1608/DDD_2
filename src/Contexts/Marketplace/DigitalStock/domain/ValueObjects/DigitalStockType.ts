import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidDigitalStockType } from '../Errors/InvalidDigitalStockType'

export enum AvailableDigitalStockType {
  CODE = 'CODE',
  FILE = 'FILE'
}

export class DigitalStockType extends EnumValueObject<AvailableDigitalStockType> {
  constructor (value: AvailableDigitalStockType) {
    super(value, Object.values(AvailableDigitalStockType))
  }

  protected throwErrorForInvalidValue (value: AvailableDigitalStockType): void {
    throw new InvalidDigitalStockType(value)
  }
}
