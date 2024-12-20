import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class StripeAccountAlreadyExists extends DomainError {
  protected code: string = 'stripe-account-already-exists'
  protected readonly message: string

  constructor (id: Id) {
    super()
    this.message = `Stripe account with id ${id} already exists`
  }
}
