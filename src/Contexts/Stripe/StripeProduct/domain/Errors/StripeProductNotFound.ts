import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class StripeProductNotFound extends DomainError {
  protected code: string = 'stripe-product-not-found'
  protected readonly message: string

  constructor (id: Id) {
    super()
    this.message = `Stripe product with id ${id} not found`
  }
}
