import { ThreadRepository } from '@Threads/Thread/domain/ThreadRepository'
import { TotalThreads } from '@Threads/Thread/domain/ValueObjects/TotalThreads'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'

export class Updater {
  constructor (private readonly repository: ThreadRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id
  ) {
    const thread = await this.repository.find(id)

    if (!thread) return

    const updated = thread.updateTotalThreads(new TotalThreads(thread.totalThreads.valueOf() - 1))

    await this.repository.persist(updated)
    await this.eventBus.publish(updated.pullDomainEvents())
  }
}
