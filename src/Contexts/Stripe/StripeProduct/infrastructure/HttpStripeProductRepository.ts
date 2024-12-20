import Stripe from 'stripe'
import { StProduct, StripeHttpProductRepository } from '../domain/StripeHttpProductRepository'

export class HttpStripeProductRepository implements StripeHttpProductRepository {
  async create (product: StProduct): Promise<string> {
    const client = new Stripe(product.apiKey)

    const p = await client.products.create({
      name: product.name,
      default_price_data: {
        unit_amount: Number(product.price),
        currency: 'EUR',
        recurring: product.renovationInterval && product.renovationType
          ? {
              interval: product.renovationType as any,
              interval_count: product.renovationInterval
            }
          : undefined
      }
    })

    return p.id
  }
}
