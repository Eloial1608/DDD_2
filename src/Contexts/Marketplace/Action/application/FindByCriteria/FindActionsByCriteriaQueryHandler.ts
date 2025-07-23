import type { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindActionsByCriteriaQuery } from './FindActionsByCriteriaQuery'
import type { FinderByCriteria } from './FinderByCriteria'
import type { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { ActionCollectionResponse } from '../ActionCollectionResponse'

export class FindActionsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindActionsByCriteriaQuery, ActionCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindActionsByCriteriaQuery
  }

  async handle (data: FindActionsByCriteriaQuery): Promise<ActionCollectionResponse> {
    return new ActionCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
