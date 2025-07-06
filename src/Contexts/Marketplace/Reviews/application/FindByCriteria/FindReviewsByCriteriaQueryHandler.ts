import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindReviewsByCriteriaQuery } from './FindReviewsByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { ReviewCollectionResponse } from '../ReviewCollectionResponse'

export class FindReviewsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindReviewsByCriteriaQuery, ReviewCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindReviewsByCriteriaQuery
  }

  async handle (data: FindReviewsByCriteriaQuery): Promise<ReviewCollectionResponse> {
    return new ReviewCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
