import { Nullable } from '@Shared/domain/Nullable'
import { CreateReviewCommand } from '@Marketplace/Reviews/application/Create/CreateReviewCommand'
import { Review } from '@Marketplace/Reviews/domain/Review'

export class CreateReviewCommandMother {
  static create (
    id: string,
    productId: string,
    userId: string,
    content: Nullable<string>,
    rating: number
  ): CreateReviewCommand {
    return new CreateReviewCommand(
      id,
      productId,
      userId,
      content,
      rating
    )
  }

  static fromAggregate (review: Review): CreateReviewCommand {
    return this.create(
      review.id.valueOf(),
      review.productId.valueOf(),
      review.userId.valueOf(),
      review.content?.valueOf(),
      review.rating.valueOf()
    )
  }
}
