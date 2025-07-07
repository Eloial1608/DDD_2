import { Review } from '../domain/Review'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { Nullable } from '@Shared/domain/Nullable'

export type ReviewResponseBody = {
    readonly id: string,
    readonly productId: string
    readonly content: Nullable<string>
    readonly author: {
      id: string
      mainId: string
      name: string
      username: string
      bannerUrl: Nullable<string>
      pictureUrl: Nullable<string>
    }
    readonly rating: number
    readonly userId: string
    readonly createdAt: Date
}

export class ReviewResponse implements QueryResponse<ReviewResponseBody> {
  response: ReviewResponseBody

  constructor (review: Review) {
    this.response = {
      id: review.id.valueOf(),
      productId: review.productId.valueOf(),
      author: review.author.toPrimitives(),
      content: review.content?.valueOf(),
      rating: review.rating.valueOf(),
      userId: review.userId.valueOf(),
      createdAt: review.createdAt.valueOf()
    }
  }
}
