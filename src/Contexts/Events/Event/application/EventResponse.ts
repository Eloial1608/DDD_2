import { Nullable } from '@Shared/domain/Nullable'
import { Event } from '../domain/Event'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type EventResponseBody = {
  readonly id: string
  readonly userId: string
  readonly createdAt: Date
  readonly communityId: string
  readonly spaceId: string
  readonly title: string
  readonly accessibility: string
  readonly description: Nullable<string>
  readonly startDate: Date
  readonly endDate: Date
  readonly isPrivate: boolean
  readonly bannerUrl: Nullable<string>
  readonly author: Nullable<object>
  readonly isPaid: boolean
  readonly type: string
  readonly data: Nullable<object>
  readonly maxOnlineMembers: Nullable<number>
  readonly maxOnSiteMembers: number
  readonly totalOnlineMembers: number
  readonly totalOnSiteMembers: number
  readonly location: Nullable<string>
  readonly updatedAt: Date
  readonly deletedAt: Nullable<Date>
}

export class EventResponse implements QueryResponse<EventResponseBody> {
  response: EventResponseBody

  constructor (event: Event) {
    this.response = {
      id: event.id.valueOf(),
      userId: event.userId.valueOf(),
      createdAt: event.createdAt.valueOf(),
      communityId: event.communityId.valueOf(),
      spaceId: event.spaceId.valueOf(),
      title: event.title.valueOf(),
      accessibility: event.accessibility.valueOf(),
      description: event.description?.valueOf() ?? null,
      startDate: event.startDate.valueOf(),
      endDate: event.endDate.valueOf(),
      isPrivate: event.isPrivate.valueOf(),
      bannerUrl: event.bannerUrl?.valueOf() ?? null,
      author: event.author ?? null,
      isPaid: event.isPaid.valueOf(),
      type: event.type.valueOf(),
      data: event.data ?? null,
      maxOnlineMembers: event.maxOnlineMembers?.valueOf() ?? null,
      maxOnSiteMembers: event.maxOnSiteMembers.valueOf(),
      totalOnlineMembers: event.totalOnlineMembers.valueOf(),
      totalOnSiteMembers: event.totalOnSiteMembers.valueOf(),
      location: event.location?.valueOf() ?? null,
      updatedAt: event.updatedAt.valueOf(),
      deletedAt: event.deletedAt?.valueOf() ?? null
    }
  }
}
