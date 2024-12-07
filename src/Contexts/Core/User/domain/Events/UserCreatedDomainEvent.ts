import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { User } from '../User'

type UserCreatedDomainEventBody = {
  readonly id: string
  readonly name: string
  readonly username: string
  readonly email:string
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.user.v1.created'

  readonly id: string
  readonly name: string
  readonly username: string
  readonly email:string
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(UserCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.name = params.name
    this.username = params.username
    this.email = params.email
    this.communityId = params.communityId
  }

  static fromAggregate (user: User): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      id: user.id.valueOf(),
      createdAt: user.createdAt.valueOf(),
      updatedAt: user.updatedAt.valueOf(),
      name: user.name.valueOf(),
      username: user.username.valueOf(),
      email: user.email.valueOf(),
      communityId: user.communityId.valueOf()
    })
  }

  toPrimitive (): UserCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserCreatedDomainEventBody, eventId: string, occurredOn: Date): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
