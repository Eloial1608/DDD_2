import Stripe from 'stripe'

export class StripeClientFactory {
  static create (): Stripe {
    return new Stripe(process.env.STRIPE_KEY!)
  }
}
