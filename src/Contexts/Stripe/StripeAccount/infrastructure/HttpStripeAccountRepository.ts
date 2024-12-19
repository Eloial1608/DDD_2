import Stripe from 'stripe'
import { StripeAccountNotVerified } from '../domain/Errors/StripeAccountNotVerified'
import { StripeAccountRepository } from '../domain/StripeAccountRepository'
import { ApiKey } from '../domain/ValueObjects/ApiKey'

export class HttpStripeAccountRepository implements StripeAccountRepository {
  async verify (apiKey: ApiKey) {
    try {
      await new Stripe(apiKey.valueOf()).customers.list({ limit: 1 })
    } catch (e) {
      console.log(e)
      throw new StripeAccountNotVerified()
    }
  }
}
