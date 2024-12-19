import { CreateStripeAccountCommand } from '@Stripe/StripeAccount/application/Create/CreateStripeAccountCommand'
import { StripeAccount } from '@Stripe/StripeAccount/domain/StripeAccount'

export class CreateStripeAccountCommandMother {
  static create (
    id: string,
    apiKey: string
  ): CreateStripeAccountCommand {
    return new CreateStripeAccountCommand(
      id,
      apiKey
    )
  }

  static fromAggregate (stripeAccount: StripeAccount): CreateStripeAccountCommand {
    return this.create(
      stripeAccount.id.valueOf(),
      stripeAccount.apiKey.valueOf()
    )
  }
}
