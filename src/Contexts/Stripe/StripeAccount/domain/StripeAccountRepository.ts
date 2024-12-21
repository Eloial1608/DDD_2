import { ApiKey } from './ValueObjects/ApiKey'

export interface StripeAccountRepository {
    verify (apiKey: ApiKey): Promise<void>
}
