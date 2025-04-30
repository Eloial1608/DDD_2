import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Event } from '../Event'
import { Nullable } from '@Shared/domain/Nullable'

type EventAuthorUpdatedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly createdAt: Date
    readonly communityId: string
    readonly spaceId: string
    readonly title: string
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

export class EventAuthorUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.events.event.v1.author-updated'

  readonly id: string
  readonly userId: string
  readonly createdAt: Date
  readonly communityId: string
  readonly spaceId: string
  readonly title: string
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

  static {
    DomainEvent.derived.add(EventAuthorUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: EventAuthorUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(EventAuthorUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.createdAt = params.createdAt
    this.communityId = params.communityId
    this.spaceId = params.spaceId
    this.title = params.title
    this.description = params.description
    this.startDate = params.startDate
    this.endDate = params.endDate
    this.isPrivate = params.isPrivate
    this.bannerUrl = params.bannerUrl
    this.author = params.author
    this.isPaid = params.isPaid
    this.type = params.type
    this.data = params.data
    this.maxOnlineMembers = params.maxOnlineMembers
    this.maxOnSiteMembers = params.maxOnSiteMembers
    this.totalOnlineMembers = params.totalOnlineMembers
    this.totalOnSiteMembers = params.totalOnSiteMembers
    this.location = params.location
    this.updatedAt = params.updatedAt
    this.deletedAt = params.deletedAt
  }

  static fromAggregate (event: Event): EventAuthorUpdatedDomainEvent {
    return new EventAuthorUpdatedDomainEvent({
      id: event.id.valueOf(),
      userId: event.userId.valueOf(),
      createdAt: event.createdAt.valueOf(),
      communityId: event.communityId.valueOf(),
      spaceId: event.spaceId.valueOf(),
      title: event.title.valueOf(),
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
    })
  }

  toPrimitive (): EventAuthorUpdatedDomainEventBody {
    return {
      id: this.id,
      userId: this.userId,
      createdAt: this.createdAt,
      communityId: this.communityId,
      spaceId: this.spaceId,
      title: this.title,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      isPrivate: this.isPrivate,
      bannerUrl: this.bannerUrl,
      author: this.author,
      isPaid: this.isPaid,
      type: this.type,
      data: this.data,
      maxOnlineMembers: this.maxOnlineMembers,
      maxOnSiteMembers: this.maxOnSiteMembers,
      totalOnlineMembers: this.totalOnlineMembers,
      totalOnSiteMembers: this.totalOnSiteMembers,
      location: this.location,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }

  static fromPrimitives (id: string, attributes: EventAuthorUpdatedDomainEventBody, eventId: string, occurredOn: Date): EventAuthorUpdatedDomainEvent {
    return new EventAuthorUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
