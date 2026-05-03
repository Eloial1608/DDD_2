import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindUsersByCriteriaQuery } from './FindUsersByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { UserCollectionResponse } from '../UserCollectionResponse'

export class FindUsersByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindUsersByCriteriaQuery, UserCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindUsersByCriteriaQuery
  }

  async handle (data: FindUsersByCriteriaQuery): Promise<UserCollectionResponse> {
    return new UserCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}