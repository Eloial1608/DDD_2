import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindThreadUsersByCriteriaQuery } from './FindThreadUsersByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { ThreadUserCollectionResponse } from '../ThreadUserCollectionResponse'

export class FindThreadUsersByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindThreadUsersByCriteriaQuery, ThreadUserCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindThreadUsersByCriteriaQuery
  }

  async handle (data: FindThreadUsersByCriteriaQuery): Promise<ThreadUserCollectionResponse> {
    return new ThreadUserCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
