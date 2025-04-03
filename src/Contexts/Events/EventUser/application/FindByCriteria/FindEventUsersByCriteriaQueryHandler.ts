import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindEventUsersByCriteriaQuery } from './FindEventUsersByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { EventUserCollectionResponse } from '../EventUserCollectionResponse'

export class FindEventUsersByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindEventUsersByCriteriaQuery, EventUserCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindEventUsersByCriteriaQuery
  }

  async handle (data: FindEventUsersByCriteriaQuery): Promise<EventUserCollectionResponse> {
    return new EventUserCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
