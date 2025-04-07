import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { EventUser } from '../EventUser'

type EventUserValidatedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly eventId: string
    readonly isOnline: boolean
    readonly isOnSite: boolean
    readonly createdAt: Date
}

export class EventUserValidatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.events.events-user.v1.validated'

  readonly id: string
  readonly userId: string
  readonly eventId: string
  readonly isOnline: boolean
  readonly isOnSite: boolean
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(EventUserValidatedDomainEvent.EVENT_NAME)
  }

  constructor (params: EventUserValidatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(EventUserValidatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.isOnSite = params.isOnSite
    this.isOnline = params.isOnline
    this.eventId = params.eventId
    this.createdAt = params.createdAt
  }

  static fromAggregate (eventUser: EventUser): EventUserValidatedDomainEvent {
    return new EventUserValidatedDomainEvent({
      id: eventUser.id.valueOf(),
      userId: eventUser.userId.valueOf(),
      isOnline: eventUser.isOnline.valueOf(),
      isOnSite: eventUser.isOnSite.valueOf(),
      eventId: eventUser.eventId.valueOf(),
      createdAt: eventUser.createdAt.valueOf()
    })
  }

  toPrimitive (): EventUserValidatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: EventUserValidatedDomainEventBody, eventId: string, occurredOn: Date): EventUserValidatedDomainEvent {
    return new EventUserValidatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
