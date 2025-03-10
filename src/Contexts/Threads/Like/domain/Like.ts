import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { ThreadId } from './ValueObjects/ThreadId'
import { UserId } from './ValueObjects/UserId'

export class Like extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly threadId: ThreadId,
        readonly userId: UserId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }
}
