import { Id } from '@Stripe/StripeSession/domain/ValueObjects/Id'
import { StripeSession } from '@Stripe/StripeSession/domain/StripeSession'
import { StripeSessionNotFound } from '@Stripe/StripeSession/domain/Errors/StripeSessionNotFound'
import { StripeSessionRepository } from '@Stripe/StripeSession/domain/StripeSessionRepository'

export class FinderById {
  constructor (private readonly repository: StripeSessionRepository) {}

  async find (id: Id): Promise<StripeSession> {
    const stripesession = await this.repository.find(id)

    if (!stripesession) throw new StripeSessionNotFound(id)

    return stripesession
  }
}
