import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { StripeProduct } from '@Stripe/StripeProduct/domain/StripeProduct'
import { StripeProductNotFound } from '@Stripe/StripeProduct/domain/Errors/StripeProductNotFound'
import { StripeProductRepository } from '@Stripe/StripeProduct/domain/StripeProductRepository'

export class FinderById {
  constructor (private readonly repository: StripeProductRepository) {}

  async find (id: Id): Promise<StripeProduct> {
    const stripeProduct = await this.repository.find(id)

    if (!stripeProduct) throw new StripeProductNotFound(id)

    return stripeProduct
  }
}
