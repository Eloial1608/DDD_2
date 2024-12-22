import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindCalendarByIdQuery } from './FindCalendarByIdQuery'
import { CalendarResponse } from '../CalendarResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/Calendar/domain/ValueObjects/Id'

export class FindCalendarByIdQueryHandler implements QueryHandler<FindCalendarByIdQuery, CalendarResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindCalendarByIdQuery
  }

  async handle (data: FindCalendarByIdQuery): Promise<CalendarResponse> {
    return new CalendarResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
