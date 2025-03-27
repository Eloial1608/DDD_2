import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindEventByCriteriaQuery } from './FindEventByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { EventCollectionResponse } from '../EventCollectionResponse'

export class FindEventByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindEventByCriteriaQuery, EventCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindEventByCriteriaQuery
  }

  async handle (data: FindEventByCriteriaQuery): Promise<EventCollectionResponse> {
    return new EventCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
