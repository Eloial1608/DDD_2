import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Calendar } from '../Calendar'

type CalendarDeletedDomainEventBody = {
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

export class CalendarDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.calendar.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly userIds: string[]
  readonly content: string
  readonly dateAt: Date
  readonly entityId: Nullable<string>
  readonly entityType: Nullable<string>
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(CalendarDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: CalendarDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CalendarDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.communityId = params.communityId
    this.userIds = params.userIds
    this.content = params.content
    this.dateAt = params.dateAt
    this.entityId = params.entityId
    this.entityType = params.entityType
  }

  static fromAggregate (calendar: Calendar): CalendarDeletedDomainEvent {
    return new CalendarDeletedDomainEvent({
      id: calendar.id.valueOf(),
      createdAt: calendar.createdAt.valueOf(),
      updatedAt: calendar.updatedAt.valueOf(),
      communityId: calendar.communityId.valueOf(),
      userIds: calendar.userIds.valueOf(),
      content: calendar.content.valueOf(),
      dateAt: calendar.dateAt.valueOf(),
      entityId: calendar.entityId?.valueOf(),
      entityType: calendar.entityType?.valueOf()
    })
  }

  toPrimitive (): CalendarDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CalendarDeletedDomainEventBody, eventId: string, occurredOn: Date): CalendarDeletedDomainEvent {
    return new CalendarDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
