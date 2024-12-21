import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { StripeProduct } from '@Stripe/StripeProduct/domain/StripeProduct'
import { StripeProductNotFound } from '@Stripe/StripeProduct/domain/Errors/StripeProductNotFound'
import { StripeProductRepository } from '@Stripe/StripeProduct/domain/StripeProductRepository'

export class FinderById {
  constructor (private readonly repository: StripeProductRepository) {}

  async find (id: Id): Promise<StripeProduct> {
    const stripeproduct = await this.repository.find(id)

    if (!stripeproduct) throw new StripeProductNotFound(id)

    return stripeproduct
  }
}
