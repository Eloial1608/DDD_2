import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Session } from '../Session'

type SessionCreatedDomainEventBody = {
  readonly id: string
  readonly communityId: string
  readonly country: string
  readonly city: string
}

export class SessionCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Metrics.session.v1.created'

  readonly id: string
  readonly communityId: string
  readonly country: string
  readonly city: string

  static {
    DomainEvent.derived.add(SessionCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SessionCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SessionCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.country = params.country
    this.city = params.city
  }

  static fromAggregate (session: Session): SessionCreatedDomainEvent {
    return new SessionCreatedDomainEvent({
      id: session.id.valueOf(),
      communityId: session.communityId.valueOf(),
      country: session.country.valueOf(),
      city: session.city.valueOf()
    })
  }

  toPrimitive (): SessionCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SessionCreatedDomainEventBody, eventId: string, occurredOn: Date): SessionCreatedDomainEvent {
    return new SessionCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
