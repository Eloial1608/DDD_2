import { Nullable } from '@Shared/domain/Nullable'
import { Calendar } from '../domain/Calendar'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type CalendarResponseBody = {
    readonly id: string
    readonly communityId: string
    readonly userIds: string[]
    readonly content: string
    readonly dateAt: Date
    readonly entityId: Nullable<string>
    readonly entityType: Nullable<string>
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class CalendarResponse implements QueryResponse<CalendarResponseBody> {
  response: CalendarResponseBody

  constructor (calendar: Calendar) {
    this.response = {
      id: calendar.id.valueOf(),
      communityId: calendar.communityId.valueOf(),
      userIds: calendar.userIds.valueOf(),
      content: calendar.content.valueOf(),
      dateAt: calendar.dateAt.valueOf(),
      entityId: calendar.entityId?.valueOf(),
      entityType: calendar.entityType?.valueOf(),
      createdAt: calendar.createdAt.valueOf(),
      updatedAt: calendar.updatedAt.valueOf()
    }
  }
}
