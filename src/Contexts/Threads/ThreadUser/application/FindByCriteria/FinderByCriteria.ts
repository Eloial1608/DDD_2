import { ThreadUserRepository } from '@Threads/ThreadUser/domain/ThreadUserRepository'
import { ThreadUser } from '@Threads/ThreadUser/domain/ThreadUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: ThreadUserRepository) {}

  async find (criteria: Criteria): Promise<Array<ThreadUser>> {
    return await this.repository.search(criteria)
  }
}
