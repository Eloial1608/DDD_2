import { Product } from '../domain/Product'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { ProductTypes } from '../domain/ValueObjects/Type'
import { ProductMediaPrimitive } from '../domain/ValueObjects/ProductMedia'
import { Nullable } from '@Shared/domain/Nullable'

export type ProductResponseBody = {
    readonly id: string,
        readonly communityId: string,
        readonly spaceId: string,
        readonly title: string,
        readonly userId: string,
        readonly content: string,
        readonly bannerUrl: Nullable<string>,
        readonly productMedia: ProductMediaPrimitive[],
        readonly type: ProductTypes,
        readonly stock: Nullable<number>,
        readonly price: Nullable<{
            value: number,
            currency: string
        }>
        readonly totalRatings: number
        readonly createdAt: Date
        readonly updatedAt: Date
}

export class ProductResponse implements QueryResponse<ProductResponseBody> {
  response: ProductResponseBody

  constructor (product: Product) {
    this.response = {
      id: product.id.valueOf(),
      communityId: product.communityId.valueOf(),
      spaceId: product.spaceId.valueOf(),
      title: product.title.valueOf(),
      userId: product.userId.valueOf(),
      content: product.content.valueOf(),
      productMedia: product.productMedia.map(x => x.toPrimitives()),
      price: {
        value: product.price.value.valueOf(),
        currency: product.price.currency.valueOf()
      },
      type: product.type.valueOf(),
      bannerUrl: product.bannerUrl?.valueOf(),
      stock: product.stock?.valueOf(),
      totalRatings: product.totalRatings.valueOf(),
      createdAt: product.createdAt.valueOf(),
      updatedAt: product.updatedAt.valueOf()
    }
  }
}
