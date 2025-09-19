import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { NewUser } from '../NewUser'

type NewUserCreatedDomainEventBody = {
  readonly id: string
  readonly userId: string
  readonly communityId: string
}

export class NewUserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Metrics.newuser.v1.created'

  readonly id: string
  readonly userId: string
  readonly communityId: string

  static {
    DomainEvent.derived.add(NewUserCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: NewUserCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(NewUserCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
  }

  static fromAggregate (newuser: NewUser): NewUserCreatedDomainEvent {
    return new NewUserCreatedDomainEvent({
      id: newuser.id.valueOf(),
      communityId: newuser.communityId.valueOf(),
      userId: newuser.userId.valueOf()
    })
  }

  toPrimitive (): NewUserCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: NewUserCreatedDomainEventBody, eventId: string, occurredOn: Date): NewUserCreatedDomainEvent {
    return new NewUserCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
