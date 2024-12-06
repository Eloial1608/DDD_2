import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { AuthUser } from '../AuthUser'

type AuthUserCreatedDomainEventBody = {
    readonly id: string
    readonly email: string
    readonly userId: string
    readonly communityId: string
    readonly createdAt: Date
}

export class AuthUserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.auth-user.v1.created'

  readonly id: string
  readonly email: string
  readonly userId: string
  readonly communityId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(AuthUserCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: AuthUserCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(AuthUserCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.email = params.email
    this.userId = params.userId
    this.communityId = params.communityId
  }

  static fromAggregate (authUser: AuthUser): AuthUserCreatedDomainEvent {
    return new AuthUserCreatedDomainEvent({
      id: authUser.id.valueOf(),
      createdAt: authUser.createdAt.valueOf(),
      email: authUser.email.valueOf(),
      userId: authUser.userId.valueOf(),
      communityId: authUser.communityId.valueOf()

    })
  }

  toPrimitive (): AuthUserCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: AuthUserCreatedDomainEventBody, eventId: string, occurredOn: Date): AuthUserCreatedDomainEvent {
    return new AuthUserCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
