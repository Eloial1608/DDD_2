import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { PostId } from './ValueObjects/PostId'
import { UserId } from './ValueObjects/UserId'

export class Like extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly postId: PostId,
        readonly userId: UserId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }
}
