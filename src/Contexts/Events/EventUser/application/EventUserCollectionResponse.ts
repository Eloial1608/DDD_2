import { EventUser } from '../domain/EventUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { EventUserResponse, EventUserResponseBody } from './EventUserResponse'

export class EventUserCollectionResponse implements QueryResponse<Array<EventUserResponseBody>> {
  response: Array<EventUserResponseBody>

  constructor (eventUser: Array<EventUser>) {
    this.response = eventUser.map(x => new EventUserResponse(x).response)
  }
}
