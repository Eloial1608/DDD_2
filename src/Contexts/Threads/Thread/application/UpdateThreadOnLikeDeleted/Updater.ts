import { ThreadRepository } from '@Threads/Thread/domain/ThreadRepository'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { TotalLikes } from '@Threads/Thread/domain/ValueObjects/TotalLikes'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: ThreadRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id
  ) {
    const thread = await this.repository.find(id)

    if (!thread) return

    const updated = thread.updateTotalLikes(new TotalLikes(thread.totalLikes.valueOf() - 1))

    await this.repository.persist(updated)
    await this.eventBus.publish(updated.pullDomainEvents())
  }
}
