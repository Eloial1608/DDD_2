import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindEventsUsersByCriteriaQuery } from './FindEventsUsersByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { EventsUserCollectionResponse } from '../EventsUserCollectionResponse'

export class FindEventsUsersByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindEventsUsersByCriteriaQuery, EventsUserCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindEventsUsersByCriteriaQuery
  }

  async handle (data: FindEventsUsersByCriteriaQuery): Promise<EventsUserCollectionResponse> {
    return new EventsUserCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
