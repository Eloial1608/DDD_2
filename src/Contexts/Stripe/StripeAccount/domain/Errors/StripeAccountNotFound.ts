import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class StripeAccountNotFound extends DomainError {
  protected code: string = 'stripe-account-not-found'
  protected readonly message: string

  constructor (id: Id) {
    super()
    this.message = `Stripe account with id ${id} not found`
  }
}
