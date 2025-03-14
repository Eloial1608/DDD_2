import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { NotAllowedToPersistThread } from '@Threads/Thread/domain/Errors/NotAllowedToPersistThread'
import { ThreadRepository } from '@Threads/Thread/domain/ThreadRepository'
import { CommunityId } from '@Threads/Thread/domain/ValueObjects/CommunityId'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { UserId } from '@Threads/Thread/domain/ValueObjects/UserId'

export class Deleter {
  constructor (private readonly repository: ThreadRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    userId: UserId
  ): Promise<void> {
    const existingThread = await this.repository.find(id)

    if (!existingThread || existingThread.communityId.valueOf() !== communityId.valueOf()) return

    if (existingThread.userId.valueOf() !== userId.valueOf()) throw new NotAllowedToPersistThread(id)

    const thread = existingThread.delete()

    await this.repository.persist(thread)

    await this.eventBus.publish(thread.pullDomainEvents())
  }
}
