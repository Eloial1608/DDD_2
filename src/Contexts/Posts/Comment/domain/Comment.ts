import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { PostId } from './ValueObjects/PostId'
import { UserId } from './ValueObjects/UserId'
import { UserMetadata } from './ValueObjects/UserMetadata'
import { Content } from './ValueObjects/Content'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'

export class Comment extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly postId: PostId,
        readonly userId: UserId,
        readonly userMetadata: UserMetadata,
        readonly content: Content,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt
  ) {
    super()
  }
}
