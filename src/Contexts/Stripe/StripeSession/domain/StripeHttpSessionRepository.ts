import { Nullable } from '@Shared/domain/Nullable'

export type SessionData = {
    successUrl: string
    failUrl: string
    priceId: string
    renovationInterval: Nullable<number>
    renovationType: Nullable<string>
  }

export type CreateResponse = {
    id: string
    url: string
}

export interface StripeHttpSessionRepository {
    create (apiKey: string, session: SessionData): Promise<CreateResponse>
}
