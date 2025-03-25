import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { EventsUser } from '../EventsUser'

type EventsUserCreatedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly eventId: string
    readonly createdAt: Date
}

export class EventsUserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.events.events-user.v1.created'

  readonly id: string
  readonly userId: string
  readonly eventId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(EventsUserCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: EventsUserCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(EventsUserCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.eventId = params.eventId
    this.createdAt = params.createdAt
  }

  static fromAggregate (eventsUser: EventsUser): EventsUserCreatedDomainEvent {
    return new EventsUserCreatedDomainEvent({
      id: eventsUser.id.valueOf(),
      userId: eventsUser.userId.valueOf(),
      eventId: eventsUser.eventId.valueOf(),
      createdAt: eventsUser.createdAt.valueOf()
    })
  }

  toPrimitive (): EventsUserCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: EventsUserCreatedDomainEventBody, eventId: string, occurredOn: Date): EventsUserCreatedDomainEvent {
    return new EventsUserCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
