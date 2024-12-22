import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Calendar } from '../Calendar'

type CalendarUpdatedDomainEventBody = {
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

export class CalendarUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.calendar.v1.updated'

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
    DomainEvent.derived.add(CalendarUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CalendarUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CalendarUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

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

  static fromAggregate (calendar: Calendar): CalendarUpdatedDomainEvent {
    return new CalendarUpdatedDomainEvent({
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

  toPrimitive (): CalendarUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CalendarUpdatedDomainEventBody, eventId: string, occurredOn: Date): CalendarUpdatedDomainEvent {
    return new CalendarUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
