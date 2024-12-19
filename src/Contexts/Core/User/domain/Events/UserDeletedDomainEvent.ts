import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { User } from '../User'

type UserDeletedDomainEventBody = {
    readonly id: string
    readonly mainId: string
    readonly communityId:string
}

export class UserDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.user.v1.deleted'

  readonly id: string
  readonly mainId: string
  readonly communityId: string

  static {
    DomainEvent.derived.add(UserDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserDeletedDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(UserDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.mainId = params.mainId
    this.communityId = params.communityId
  }

  static fromAggregate (user:User): UserDeletedDomainEvent {
    return new UserDeletedDomainEvent({
      id: user.id.valueOf(),
      mainId: user.mainId.valueOf(),
      communityId: user.communityId.valueOf()
    })
  }

  toPrimitive (): UserDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserDeletedDomainEventBody, eventId: string, occurredOn: Date): UserDeletedDomainEvent {
    return new UserDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
