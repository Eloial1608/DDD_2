import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindThreadsByCriteriaQuery } from './FindThreadsByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { ThreadCollectionResponse } from '../ThreadCollectionResponse'

export class FindThreadsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindThreadsByCriteriaQuery, ThreadCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindThreadsByCriteriaQuery
  }

  async handle (data: FindThreadsByCriteriaQuery): Promise<ThreadCollectionResponse> {
    return new ThreadCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
