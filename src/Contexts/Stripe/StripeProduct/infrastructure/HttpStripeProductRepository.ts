import Stripe from 'stripe'
import { Params, StripeHttpProductRepository } from '../domain/StripeHttpProductRepository'

export class HttpStripeProductRepository implements StripeHttpProductRepository {
  async create (apiKey: string, product: Params): Promise<string> {
    const client = new Stripe(apiKey)
    try {
      const p = await client.products.create({
        id: product.id.valueOf(),
        name: product.name.valueOf(),
        default_price_data: {
          unit_amount: Number(product.price.valueOf()),
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
    } catch (e: any) {
      if (e?.type === 'StripeInvalidRequestError' && e?.raw?.code === 'resource_already_exists') {
        return (await client.products.retrieve(product.id.valueOf())).default_price as string
      }
    }

    throw new Error('Invalid product')
  }

  async update (apiKey: string, product: Params): Promise<string> {
    const client = new Stripe(apiKey)

    const price = await client.prices.create({
      unit_amount: Number(product.price!.valueOf()),
      currency: 'EUR',
      product: product.id.valueOf(),
      recurring: product.renovationInterval?.valueOf() && product.renovationType?.valueOf()
        ? {
            interval: product.renovationType.valueOf() as any,
            interval_count: product.renovationInterval.valueOf()
          }
        : undefined
    })

    const p = await client.products.update(product.id!.valueOf(), {
      name: product.name!.valueOf(),
      default_price: price.id
    })

    return p.default_price as string
  }
}
