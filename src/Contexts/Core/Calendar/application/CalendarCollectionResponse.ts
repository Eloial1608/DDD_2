import { Calendar } from '../domain/Calendar'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { CalendarResponse, CalendarResponseBody } from './CalendarResponse'

export class CalendarCollectionResponse implements QueryResponse<Array<CalendarResponseBody>> {
  response: Array<CalendarResponseBody>

  constructor (calendar: Array<Calendar>) {
    this.response = calendar.map(x => new CalendarResponse(x).response)
  }
}
