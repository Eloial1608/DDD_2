import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class StripeSessionNotVerified extends DomainError {
  protected code: string = 'stripe-session-not-verified'
  protected readonly message: string

  constructor (id: Id) {
    super()
    this.message = `Stripe session with id ${id} not verified`
  }
}
