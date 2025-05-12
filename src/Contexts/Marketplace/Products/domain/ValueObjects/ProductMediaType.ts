import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidProductMediaType } from '../Errors/InvalidProductMediaType'

export enum ProductMediaTypes {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO'
}

export class ProductMediaType extends EnumValueObject<ProductMediaTypes> {
  constructor (type: ProductMediaTypes) {
    super(type, Object.values(ProductMediaTypes))
  }

  protected throwErrorForInvalidValue (value: ProductMediaTypes): void {
    throw new InvalidProductMediaType(this)
  }
}
