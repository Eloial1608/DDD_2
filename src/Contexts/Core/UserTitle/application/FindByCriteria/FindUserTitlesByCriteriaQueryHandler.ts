import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindUserTitlesByCriteriaQuery } from './FindUserTitlesByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { UserTitleCollectionResponse } from '../UserTitleCollectionResponse'

export class FindUserTitlesByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindUserTitlesByCriteriaQuery, UserTitleCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindUserTitlesByCriteriaQuery
  }

  async handle (data: FindUserTitlesByCriteriaQuery): Promise<UserTitleCollectionResponse> {
    return new UserTitleCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
