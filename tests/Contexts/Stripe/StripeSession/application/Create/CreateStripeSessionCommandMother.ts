import { CreateStripeSessionCommand } from '@Stripe/StripeSession/application/Create/CreateStripeSessionCommand'
import { StripeSession } from '@Stripe/StripeSession/domain/StripeSession'

export class CreateStripeSessionCommandMother {
  static create (
    id: string,
    accountId: string,
    productId: string,
    successUrl: string,
    failUrl: string
  ): CreateStripeSessionCommand {
    return new CreateStripeSessionCommand(
      id,
      accountId,
      productId,
      successUrl,
      failUrl
    )
  }

  static fromAggregate (stripeSession: StripeSession): CreateStripeSessionCommand {
    return this.create(
      stripeSession.id.valueOf(),
      stripeSession.accountId.valueOf(),
      stripeSession.product.id,
      stripeSession.successUrl.valueOf(),
      stripeSession.failUrl.valueOf()
    )
  }
}
