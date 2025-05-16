import { Nullable } from '@Shared/domain/Nullable'
import { EventUser } from '../domain/EventUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type EventUserResponseBody = {
    readonly id: string
    readonly userId: string
    readonly eventId: string
    readonly ticketId: string
    readonly isOnline: boolean
    readonly isOnSite: boolean
    readonly validatedAt: Nullable<Date >
    readonly createdAt: Date
}

export class EventUserResponse implements QueryResponse<EventUserResponseBody> {
  response: EventUserResponseBody

  constructor (eventUser: EventUser) {
    this.response = {
      id: eventUser.id.valueOf(),
      userId: eventUser.userId.valueOf(),
      eventId: eventUser.eventId.valueOf(),
      ticketId: eventUser.ticketId.valueOf(),
      isOnline: eventUser.isOnline.valueOf(),
      isOnSite: eventUser.isOnSite.valueOf(),
      validatedAt: eventUser.validatedAt?.valueOf(),
      createdAt: eventUser.createdAt.valueOf()
    }
  }
}
