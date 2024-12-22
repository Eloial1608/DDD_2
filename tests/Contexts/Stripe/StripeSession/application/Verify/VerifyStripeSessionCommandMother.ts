import { VerifyStripeSessionCommand } from '@Stripe/StripeSession/application/Verify/VerifyStripeSessionCommand'
import { StripeSession } from '@Stripe/StripeSession/domain/StripeSession'

export class VerifyStripeSessionCommandMother {
  static verify (
    id: string
  ): VerifyStripeSessionCommand {
    return new VerifyStripeSessionCommand(
      id
    )
  }

  static fromAggregate (stripeSession: StripeSession): VerifyStripeSessionCommand {
    return this.verify(
      stripeSession.id.valueOf()
    )
  }
}
