import { StripeSession } from '../domain/StripeSession'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type StripeSessionResponseBody = {
    readonly id: string
    readonly url: string
    readonly accountId: string
}

export class StripeSessionResponse implements QueryResponse<StripeSessionResponseBody> {
  response: StripeSessionResponseBody

  constructor (stripesession: StripeSession) {
    this.response = {
      id: stripesession.id.valueOf(),
      url: stripesession.url.valueOf(),
      accountId: stripesession.accountId.valueOf()
    }
  }
}
