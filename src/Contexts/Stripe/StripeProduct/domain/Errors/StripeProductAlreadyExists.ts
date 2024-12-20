import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class StripeProductAlreadyExists extends DomainError {
  protected code: string = 'stripe-product-already-exists'
  protected readonly message: string

  constructor (id: Id) {
    super()
    this.message = `Stripe product with id ${id} already exists`
  }
}
