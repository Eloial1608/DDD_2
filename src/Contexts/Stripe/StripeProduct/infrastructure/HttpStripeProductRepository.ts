import Stripe from 'stripe'
import { StripeHttpProductRepository } from '../domain/StripeHttpProductRepository'
import { StripeProduct } from '../domain/StripeProduct'

export class HttpStripeProductRepository implements StripeHttpProductRepository {
  async create (apiKey: string, product: Partial<StripeProduct>): Promise<string> {
    const client = new Stripe(apiKey)

    const p = await client.products.create({
      id: product.id!.valueOf(),
      name: product.name!.valueOf(),
      default_price_data: {
        unit_amount: Number(product.price!.valueOf()),
        currency: 'EUR',
        recurring: product.renovationInterval?.valueOf() && product.renovationType?.valueOf()
          ? {
              interval: product.renovationType.valueOf() as any,
              interval_count: product.renovationInterval.valueOf()
            }
          : undefined
      }
    })

    return p.default_price as string
  }
}
