import { Event } from '../domain/Event'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { EventResponse, EventResponseBody } from './EventResponse'

export class EventCollectionResponse implements QueryResponse<Array<EventResponseBody>> {
  response: Array<EventResponseBody>

  constructor (event: Array<Event>) {
    this.response = event.map(x => new EventResponse(x).response)
  }
}
