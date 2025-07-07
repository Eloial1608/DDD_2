import { Review } from '../domain/Review'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { ReviewResponse, ReviewResponseBody } from './ReviewResponse'

export class ReviewCollectionResponse implements QueryResponse<Array<ReviewResponseBody>> {
  response: Array<ReviewResponseBody>

  constructor (review: Array<Review>) {
    this.response = review.map(x => new ReviewResponse(x).response)
  }
}
