import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { PostId } from './ValueObjects/PostId'
import { UserId } from './ValueObjects/UserId'
import { LikeDeletedDomainEvent } from './Events/LikeDeletedDomainEvent'
import { LikeCreatedDomainEvent } from './Events/LikeCreatedDomainEvent'

export class Like extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly postId: PostId,
        readonly userId: UserId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    postId: PostId,
    userId: UserId
  ) {
    const like = new Like(
      id,
      postId,
      userId,
      new CreatedAt(new Date())
    )

    like.record(LikeCreatedDomainEvent.fromAggregate(like))

    return like
  }

  delete () {
    const like = new Like(
      this.id,
      this.postId,
      this.userId,
      this.createdAt
    )

    like.record(LikeDeletedDomainEvent.fromAggregate(like))

    return like
  }
}
