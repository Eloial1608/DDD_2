import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { ThreadId } from './ValueObjects/ThreadId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'

export class ThreadUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly threadId: ThreadId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }
}
