import { StripeAccount } from '../domain/StripeAccount'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type StripeAccountResponseBody = {
    readonly id: string
    readonly apiKey: string
}

export class StripeAccountResponse implements QueryResponse<StripeAccountResponseBody> {
  response: StripeAccountResponseBody

  constructor (stripeaccount: StripeAccount) {
    this.response = {
      id: stripeaccount.id.valueOf(),
      apiKey: stripeaccount.apiKey.valueOf()
    }
  }
}
