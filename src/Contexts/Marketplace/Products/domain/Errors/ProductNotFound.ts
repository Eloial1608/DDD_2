import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class ProductNotFound extends DomainError {
  protected code = 'product-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A product with id ${id} wasn't found`
  }
}
