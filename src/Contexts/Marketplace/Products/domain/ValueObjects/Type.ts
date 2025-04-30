import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidType } from '../Errors/InvalidType'

export enum ProductTypes {
    PHYSICAL = 'PHYSICAL',
    CODE = 'CODE',
    FILE = 'FILE',
    SERVICE = 'SERVICE'
}

export class Type extends EnumValueObject<ProductTypes> {
  constructor (type: ProductTypes) {
    super(type, Object.values(ProductTypes))
  }

  protected throwErrorForInvalidValue (value: ProductTypes): void {
    throw new InvalidType(this)
  }
}
