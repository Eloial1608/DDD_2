import { SessionRepository } from '@Core/Shared/domain/SessionRepository'
import Stripe from 'stripe'

export class HttpSessionRepository implements SessionRepository {
  constructor (private readonly client: Stripe) {}

  async create (priceId: string, successUrl: string, failUrl: string) {
    const session = await this.client.checkout.sessions.create({
      success_url: successUrl,
      mode: 'subscription',
      cancel_url: failUrl,
      line_items: [{
        price: priceId,
        quantity: 1
      }]
    })

    return {
      id: session.id,
      url: session.url as string
    }
  }

  async verify (id: string): Promise<boolean> {
    const session = await this.client.checkout.sessions.retrieve(id)

    return session.payment_status !== 'unpaid'
  }
}
