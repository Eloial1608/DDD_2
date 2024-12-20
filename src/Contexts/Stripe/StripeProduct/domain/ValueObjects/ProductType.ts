import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidProductType } from '../Errors/InvalidProductType'

export enum ProductTypes {
    COMMUNITY_PLANS = 'community-plans'
}

export class ProductType extends EnumValueObject<ProductTypes> {
  constructor (value: ProductTypes) {
    super(value, Object.values(ProductTypes))
  }

  protected throwErrorForInvalidValue (value: ProductTypes): void {
    throw new InvalidProductType(value)
  }
}
