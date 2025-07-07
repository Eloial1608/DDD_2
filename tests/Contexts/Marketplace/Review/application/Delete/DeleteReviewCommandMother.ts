import { DeleteReviewCommand } from '@Marketplace/Reviews/application/Delete/DeleteReviewCommand'
import { Review } from '@Marketplace/Reviews/domain/Review'

export class DeleteReviewCommandMother {
  static create (
    id: string
  ): DeleteReviewCommand {
    return new DeleteReviewCommand(
      id
    )
  }

  static fromAggregate (review: Review): DeleteReviewCommand {
    return this.create(
      review.id.valueOf()
    )
  }
}
