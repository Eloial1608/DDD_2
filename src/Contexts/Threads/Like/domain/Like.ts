import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { ThreadId } from './ValueObjects/ThreadId'
import { UserId } from './ValueObjects/UserId'
import { LikeCreatedDomainEvent } from './Events/LikeCreatedDomainEvent'

export class Like extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly threadId: ThreadId,
        readonly userId: UserId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }

  static create (
      id: Id,
      threadId: ThreadId,
      userId: UserId
    ) {
      const like = new Like(
        id,
        threadId,
        userId,
        new CreatedAt(new Date())
      )
  
      like.record(LikeCreatedDomainEvent.fromAggregate(like))
  
      return like
    }
}
