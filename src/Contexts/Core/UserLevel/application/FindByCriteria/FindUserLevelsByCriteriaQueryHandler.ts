import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindUserLevelsByCriteriaQuery } from './FindUserLevelsByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { UserLevelCollectionResponse } from '../UserLevelCollectionResponse'

export class FindUserLevelsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindUserLevelsByCriteriaQuery, UserLevelCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindUserLevelsByCriteriaQuery
  }

  async handle (data: FindUserLevelsByCriteriaQuery): Promise<UserLevelCollectionResponse> {
    return new UserLevelCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
