import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { PostId } from './ValueObjects/PostId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'

export class PostUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly postId: PostId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }
}
