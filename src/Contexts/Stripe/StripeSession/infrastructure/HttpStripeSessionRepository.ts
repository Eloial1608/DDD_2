import Stripe from 'stripe'
import { CreateResponse, SessionData, StripeHttpSessionRepository } from '../domain/StripeHttpSessionRepository'
import { StripeSession } from '../domain/StripeSession'

export class HttpStripeSessionRepository implements StripeHttpSessionRepository {
  async create (apiKey: string, session: SessionData): Promise<CreateResponse> {
    const client = new Stripe(apiKey)

    const s = await client.checkout.sessions.create({
      customer_creation: 'if_required',
      success_url: session.successUrl,
      mode: session.renovationInterval && session.renovationType ? 'subscription' : 'payment',
      cancel_url: session.failUrl,
      line_items: [{
        price: session.priceId,
        quantity: 1
      }]
    })

    return {
      id: s.id,
      url: s.url as string
    }
  }

  async verify (apiKey: string, session: StripeSession): Promise<boolean> {
    const client = new Stripe(apiKey)

    const s = await client.checkout.sessions.retrieve(session.id.valueOf())

    return s.payment_status !== 'unpaid'
  }
}
