import { SessionData, CreateResponse } from '@Stripe/StripeSession/domain/StripeHttpSessionRepository'
import { StripeSession } from '@Stripe/StripeSession/domain/StripeSession'
import { HttpStripeSessionRepository } from '@Stripe/StripeSession/infrastructure/HttpStripeSessionRepository'

export class HttpStripeSessionRepositoryMock implements HttpStripeSessionRepository {
  async create (apiKey: string, session: SessionData): Promise<CreateResponse> {
    return {
      id: 'a',
      url: 'https://www.a.com'
    }
  }

  async verify (apiKey: string, session: StripeSession): Promise<boolean> {
    return true
  }
}
