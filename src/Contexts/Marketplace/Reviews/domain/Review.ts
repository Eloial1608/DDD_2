import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { ProductId } from './ValueObjects/ProductId'
import { Author } from './ValueObjects/Author'
import { Content } from './ValueObjects/Content'
import { Nullable } from '@vitest/utils'
import { Rating } from './ValueObjects/Rating'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UserId } from './ValueObjects/UserId'
import { ReviewCreatedDomainEvent } from './Events/ReviewCreatedDomainEvent'
import { ReviewDeletedDomainEvent } from './Events/ReviewDeletedDomainEvent'

export class Review extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly productId: ProductId,
        readonly author: Author,
        readonly content: Nullable<Content>,
        readonly rating : Rating,
        readonly userId: UserId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    productId: ProductId,
    author: Author,
    content: Nullable<Content>,
    rating : Rating,
    userId: UserId
  ): Review {
    const review = new Review(
      id,
      productId,
      author,
      content,
      rating,
      userId,
      new CreatedAt(new Date())
    )

    review.record(ReviewCreatedDomainEvent.fromAggregate(review))

    return review
  }

  delete (): Review {
    const review = new Review(
      this.id,
      this.productId,
      this.author,
      this.content,
      this.rating,
      this.userId,
      this.createdAt
    )

    review.record(ReviewDeletedDomainEvent.fromAggregate(review))

    return review
  }
}
