import { ThreadRepository } from '@Threads/Thread/domain/ThreadRepository'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { Thread } from '@Threads/Thread/domain/Thread'
import { ThreadNotFound } from '@Threads/Thread/domain/Errors/ThreadNotFound'

export class FinderById {
  constructor (private readonly repository: ThreadRepository) {}

  async find (id: Id): Promise<Thread> {
    const thread = await this.repository.find(id)

    if (!thread) throw new ThreadNotFound(id)

    return thread
  }
}
