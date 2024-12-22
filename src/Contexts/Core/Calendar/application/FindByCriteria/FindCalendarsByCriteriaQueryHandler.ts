import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindCalendarsByCriteriaQuery } from './FindCalendarsByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { CalendarCollectionResponse } from '../CalendarCollectionResponse'

export class FindCalendarsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindCalendarsByCriteriaQuery, CalendarCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindCalendarsByCriteriaQuery
  }

  async handle (data: FindCalendarsByCriteriaQuery): Promise<CalendarCollectionResponse> {
    return new CalendarCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
