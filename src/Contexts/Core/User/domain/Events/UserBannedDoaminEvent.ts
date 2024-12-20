import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { User } from '../User'

type UserBannedDomainEventBody ={
    readonly id: string
    readonly mainId: string
    readonly communityId: string
}

export class UserBannedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.user.v1.banned'

  readonly id: string
  readonly mainId: string
  readonly communityId: string

  static {
    DomainEvent.derived.add(UserBannedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserBannedDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(UserBannedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.mainId = params.mainId
    this.communityId = params.communityId
  }

  static fromAggregate (user:User): UserBannedDomainEvent {
    return new UserBannedDomainEvent({
      id: user.id.valueOf(),
      mainId: user.mainId.valueOf(),
      communityId: user.communityId.valueOf()
    })
  }

  toPrimitive (): UserBannedDomainEvent {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserBannedDomainEventBody, eventId: string, occurredOn: Date): UserBannedDomainEvent {
    return new UserBannedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
