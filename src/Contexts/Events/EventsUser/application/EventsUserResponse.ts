import { EventsUser } from '../domain/EventsUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type EventsUserResponseBody = {
    readonly id: string
    readonly userId: string
    readonly eventId: string
    readonly createdAt: Date
}

export class EventsUserResponse implements QueryResponse<EventsUserResponseBody> {
  response: EventsUserResponseBody

  constructor (eventsUser: EventsUser) {
    this.response = {
      id: eventsUser.id.valueOf(),
      userId: eventsUser.userId.valueOf(),
      eventId: eventsUser.eventId.valueOf(),
      createdAt: eventsUser.createdAt.valueOf()
    }
  }
}
