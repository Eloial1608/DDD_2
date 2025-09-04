import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { User } from '../User'

type UserCreatedDomainEventBody = {
  readonly id: string
  readonly mainId: string
  readonly name: string
  readonly username: string
  readonly isAdmin: boolean
  readonly isOwner: boolean
  readonly communityId: string
}

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Metrics.user.v1.created'

  readonly id: string
  readonly mainId: string
  readonly name: string
  readonly username: string
  readonly isAdmin: boolean
  readonly isOwner: boolean
  readonly communityId: string

  static {
    DomainEvent.derived.add(UserCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.mainId = params.mainId
    this.name = params.name
    this.username = params.username
    this.communityId = params.communityId
    this.isAdmin = params.isAdmin
    this.isOwner = params.isOwner
  }

  static fromAggregate (user: User): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      id: user.id.valueOf(),
      mainId: user.mainId.valueOf(),
      name: user.name.valueOf(),
      isAdmin: user.isAdmin.valueOf(),
      isOwner: user.isOwner.valueOf(),
      username: user.username.valueOf(),
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
