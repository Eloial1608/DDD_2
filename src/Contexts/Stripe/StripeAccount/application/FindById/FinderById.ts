import { Id } from '@Stripe/StripeAccount/domain/ValueObjects/Id'
import { StripeAccount } from '@Stripe/StripeAccount/domain/StripeAccount'
import { StripeAccountNotFound } from '@Stripe/StripeAccount/domain/Errors/StripeAccountNotFound'
import { AccountRepository } from '@Stripe/StripeAccount/domain/AccountRepository'

export class FinderById {
  constructor (private readonly repository: AccountRepository) {}

  async find (id: Id): Promise<StripeAccount> {
    const stripeaccount = await this.repository.find(id)

    if (!stripeaccount) throw new StripeAccountNotFound(id)

    return stripeaccount
  }
}
