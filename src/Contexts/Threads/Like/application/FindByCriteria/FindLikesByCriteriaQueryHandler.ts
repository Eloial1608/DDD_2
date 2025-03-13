import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindLikesByCriteriaQuery } from './FindLikesByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { LikeCollectionResponse } from '../LikeCollectionResponse'

export class FindLikesByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindLikesByCriteriaQuery, LikeCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindLikesByCriteriaQuery
  }

  async handle (data: FindLikesByCriteriaQuery): Promise<LikeCollectionResponse> {
    return new LikeCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
