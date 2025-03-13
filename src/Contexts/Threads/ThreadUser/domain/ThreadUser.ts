import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { ThreadId } from './ValueObjects/ThreadId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'
import { ThreadUserCreatedDomainEvent } from './Events/ThreadUserCreatedDomainEvent'

export class ThreadUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly threadId: ThreadId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    userId: UserId,
    threadId: ThreadId
  ): ThreadUser {
    const threadUser = new ThreadUser(
      id,
      userId,
      threadId,
      new CreatedAt(new Date())
    )

    threadUser.record(ThreadUserCreatedDomainEvent.fromAggregate(threadUser))

    return threadUser
  }
}
