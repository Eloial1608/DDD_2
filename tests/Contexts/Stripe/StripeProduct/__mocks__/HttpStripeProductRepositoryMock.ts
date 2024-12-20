import { StripeProduct } from '@Stripe/StripeProduct/domain/StripeProduct'
import { StripeHttpProductRepository } from '@Stripe/StripeProduct/domain/StripeHttpProductRepository'

export class HttpStripeProductRepositoryMock implements StripeHttpProductRepository {
  async create (apiKey: string, product: StripeProduct): Promise<void> {}
}
