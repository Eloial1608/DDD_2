import { LikeRepository } from '@Media/Like/domain/LikeRepository'
import { Like } from '@Media/Like/domain/Like'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: LikeRepository) {}

  async find (criteria: Criteria): Promise<Array<Like>> {
    return await this.repository.search(criteria)
  }
}
