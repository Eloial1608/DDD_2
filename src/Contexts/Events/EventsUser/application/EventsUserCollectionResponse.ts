import { EventsUser } from '../domain/EventsUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { EventsUserResponse, EventsUserResponseBody } from './EventsUserResponse'

export class EventsUserCollectionResponse implements QueryResponse<Array<EventsUserResponseBody>> {
  response: Array<EventsUserResponseBody>

  constructor (eventsUser: Array<EventsUser>) {
    this.response = eventsUser.map(x => new EventsUserResponse(x).response)
  }
}
