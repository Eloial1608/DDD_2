import { DomainError } from '@Shared/domain/Errors/DomainError'
import { ProductTypes } from '../ValueObjects/ProductType'

export class InvalidProductType extends DomainError {
  protected code: string = 'invalid-product-type'
  protected readonly message: string

  constructor (productType: ProductTypes) {
    super()
    this.message = `Invalid product type ${productType.valueOf()}`
  }
}
