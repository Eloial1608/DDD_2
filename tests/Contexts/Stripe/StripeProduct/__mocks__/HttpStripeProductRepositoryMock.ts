import { Params, StripeHttpProductRepository } from '@Stripe/StripeProduct/domain/StripeHttpProductRepository'

export class HttpStripeProductRepositoryMock implements StripeHttpProductRepository {
  async create (apiKey: string, product: Params): Promise<string> {
    return 'paymentId'
  }
}
