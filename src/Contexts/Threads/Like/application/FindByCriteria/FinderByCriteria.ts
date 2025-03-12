import { LikeRepository } from '@Threads/Like/domain/LikeRepository'
import { Like } from '@Threads/Like/domain/Like'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: LikeRepository) {}

  async find (criteria: Criteria): Promise<Array<Like>> {
    return await this.repository.search(criteria)
  }
}
