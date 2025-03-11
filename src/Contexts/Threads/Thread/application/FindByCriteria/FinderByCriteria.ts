import { ThreadRepository } from '@Threads/Thread/domain/ThreadRepository'
import { Thread } from '@Threads/Thread/domain/Thread'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: ThreadRepository) {}

  async find (criteria: Criteria): Promise<Array<Thread>> {
    return await this.repository.search(criteria)
  }
}
