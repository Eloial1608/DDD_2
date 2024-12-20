import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class StripeSessionAlreadyExists extends DomainError {
  protected code: string = 'stripe-session-already-exists'
  protected readonly message: string

  constructor (id: Id) {
    super()
    this.message = `Stripe session with id ${id} already exists`
  }
}
