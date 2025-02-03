import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindFormsByCriteriaQuery } from './FindFormsByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { FormCollectionResponse } from '../FormCollectionResponse'

export class FindFormsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindFormsByCriteriaQuery, FormCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindFormsByCriteriaQuery
  }

  async handle (data: FindFormsByCriteriaQuery): Promise<FormCollectionResponse> {
    return new FormCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
