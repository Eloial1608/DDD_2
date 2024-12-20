import { DomainError } from '@Shared/domain/Errors/DomainError'

export class StripeAccountNotVerified extends DomainError {
  protected code: string = 'stripe-account-not-verified'
  protected message: string = 'The stripe account cant be verified'
}
