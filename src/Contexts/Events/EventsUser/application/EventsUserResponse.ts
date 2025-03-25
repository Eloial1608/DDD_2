import { EventsUser } from '../domain/EventsUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type EventsUserResponseBody = {
    readonly id: string
    readonly userId: string
    readonly eventsId: string
    readonly createdAt: Date
}

export class EventsUserResponse implements QueryResponse<EventsUserResponseBody> {
  response: EventsUserResponseBody

  constructor (eventsUser: EventsUser) {
    this.response = {
      id: eventsUser.id.valueOf(),
      userId: eventsUser.userId.valueOf(),
      eventsId: eventsUser.eventsId.valueOf(),
      createdAt: eventsUser.createdAt.valueOf()
    }
  }
}
