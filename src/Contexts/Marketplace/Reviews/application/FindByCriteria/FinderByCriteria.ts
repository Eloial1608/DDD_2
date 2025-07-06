import { ReviewRepository } from '@Marketplace/Reviews/domain/ReviewRepository'
import { Review } from '@Marketplace/Reviews/domain/Review'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: ReviewRepository) {}

  async find (criteria: Criteria): Promise<Array<Review>> {
    return await this.repository.search(criteria)
  }
}
