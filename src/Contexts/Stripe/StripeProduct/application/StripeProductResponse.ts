import { Nullable } from '@Shared/domain/Nullable'
import { StripeProduct } from '../domain/StripeProduct'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type StripeProductResponseBody = {
    readonly id: string
    readonly name: string,
    readonly price: string
    readonly renovationType: Nullable<string>
    readonly renovationInterval: Nullable<number>
}

export class StripeProductResponse implements QueryResponse<StripeProductResponseBody> {
  response: StripeProductResponseBody

  constructor (stripeproduct: StripeProduct) {
    this.response = {
      id: stripeproduct.id.valueOf(),
      name: stripeproduct.name.valueOf(),
      price: stripeproduct.price.valueOf(),
      renovationInterval: stripeproduct.renovationInterval?.valueOf(),
      renovationType: stripeproduct.renovationType?.valueOf()
    }
  }
}
