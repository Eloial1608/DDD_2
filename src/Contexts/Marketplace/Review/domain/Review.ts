import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { ProductId } from './ValueObjects/ProductId'
import { Author } from './ValueObjects/Author'
import { Content } from './ValueObjects/Content'
import { Nullable } from '@vitest/utils'
import { Rating } from './ValueObjects/Rating'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UserId } from './ValueObjects/UserId'

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
}
