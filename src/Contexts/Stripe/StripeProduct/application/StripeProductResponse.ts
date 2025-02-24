import { Nullable } from '@Shared/domain/Nullable'
import { StripeProduct } from '../domain/StripeProduct'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type StripeProductResponseBody = {
    readonly id: string
    readonly name: string
    readonly price: string
    readonly priceId: string
    readonly productType: string
    readonly renovationType: Nullable<string>
    readonly renovationInterval: Nullable<number>
}

export class StripeProductResponse implements QueryResponse<StripeProductResponseBody> {
  response: StripeProductResponseBody

  constructor (stripeProduct: StripeProduct) {
    this.response = {
      id: stripeProduct.id.valueOf(),
      name: stripeProduct.name.valueOf(),
      price: stripeProduct.price.valueOf(),
      productType: stripeProduct.productType.valueOf(),
      priceId: stripeProduct.priceId.valueOf(),
      renovationInterval: stripeProduct.renovationInterval?.valueOf(),
      renovationType: stripeProduct.renovationType?.valueOf()
    }
  }
}
