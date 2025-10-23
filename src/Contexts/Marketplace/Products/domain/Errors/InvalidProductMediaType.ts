import { DomainError } from '@Shared/domain/Errors/DomainError'
import { ProductMediaType } from '../ValueObjects/ProductMediaType'

export class InvalidProductMediaType extends DomainError {
  protected code = 'invalid-product-media-type'
  protected message

  constructor (feature: ProductMediaType) {
    super()
    this.message = `The product media type ${feature.valueOf()} isn't valid`
  }
}
