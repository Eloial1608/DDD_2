import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { PostId } from './ValueObjects/PostId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'
import { PostUserCreatedDomainEvent } from './Events/PostUserCreatedDomainEvent'

export class PostUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly postId: PostId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    userId: UserId,
    postId: PostId
  ): PostUser {
    const postUser = new PostUser(
      id,
      userId,
      postId,
      new CreatedAt(new Date())
    )

    postUser.record(PostUserCreatedDomainEvent.fromAggregate(postUser))

    return postUser
  }
}
