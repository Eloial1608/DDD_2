import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { EventUser } from '../EventUser'

type EventUserCreatedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly eventId: string
    readonly createdAt: Date
}

export class EventUserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.events.events-user.v1.created'

  readonly id: string
  readonly userId: string
  readonly eventId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(EventUserCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: EventUserCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(EventUserCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.eventId = params.eventId
    this.createdAt = params.createdAt
  }

  static fromAggregate (eventUser: EventUser): EventUserCreatedDomainEvent {
    return new EventUserCreatedDomainEvent({
      id: eventUser.id.valueOf(),
      userId: eventUser.userId.valueOf(),
      eventId: eventUser.eventId.valueOf(),
      createdAt: eventUser.createdAt.valueOf()
    })
  }

  toPrimitive (): EventUserCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: EventUserCreatedDomainEventBody, eventId: string, occurredOn: Date): EventUserCreatedDomainEvent {
    return new EventUserCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
