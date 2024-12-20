import { StripeAccountRepository } from '@Stripe/StripeAccount/domain/StripeAccountRepository'
import { ApiKey } from '@Stripe/StripeAccount/domain/ValueObjects/ApiKey'

export class HttpStripeAccountRepositoryMock implements StripeAccountRepository {
  async verify (apiKey: ApiKey): Promise<void> {}
}
