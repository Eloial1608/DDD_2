import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { ThreadId } from './ValueObjects/ThreadId'
import { UserId } from './ValueObjects/UserId'
import { LikeDeletedDomainEvent } from './Events/LikeDeletedDomainEvent'

export class Like extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly threadId: ThreadId,
        readonly userId: UserId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }
  delete () {
      const like = new Like(
        this.id,
        this.threadId,
        this.userId,
        this.createdAt
      )
  
      like.record(LikeDeletedDomainEvent.fromAggregate(like))
  
      return like
    }
}
