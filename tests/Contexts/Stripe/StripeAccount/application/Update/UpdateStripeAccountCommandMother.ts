import { UpdateStripeAccountCommand } from '@Stripe/StripeAccount/application/Update/UpdateStripeAccountCommand'
import { StripeAccount } from '@Stripe/StripeAccount/domain/StripeAccount'

export class UpdateStripeAccountCommandMother {
  static update (
    id: string,
    apiKey: string
  ): UpdateStripeAccountCommand {
    return new UpdateStripeAccountCommand(
      id,
      apiKey
    )
  }

  static fromAggregate (stripeAccount: StripeAccount): UpdateStripeAccountCommand {
    return this.update(
      stripeAccount.id.valueOf(),
      stripeAccount.apiKey.valueOf()
    )
  }
}
