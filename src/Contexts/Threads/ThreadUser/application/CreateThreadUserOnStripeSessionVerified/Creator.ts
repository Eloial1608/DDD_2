import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { ThreadUser } from '@Threads/ThreadUser/domain/ThreadUser'
import { ThreadUserRepository } from '@Threads/ThreadUser/domain/ThreadUserRepository'
import { Id } from '@Threads/ThreadUser/domain/ValueObjects/Id'
import { UserId } from '@Threads/ThreadUser/domain/ValueObjects/UserId'
import { ThreadId } from '@Threads/ThreadUser/domain/ValueObjects/ThreadId'

export class Creator {
  constructor (private readonly repository: ThreadUserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    userId: UserId,
    threadId: ThreadId
  ) {
    const threadUser = ThreadUser.create(
      id,
      userId,
      threadId
    )

    await this.repository.persist(threadUser)
    await this.eventBus.publish(threadUser.pullDomainEvents())
  }
}
