import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { User } from '../User'

type UserUnbannedDomainEventBody = {
    readonly id: string
    readonly mainId: string
    readonly communityId:string
}

export class UserUnbannedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.user.v1.unbanned'

  readonly id: string
  readonly mainId: string
  readonly communityId: string

  static {
    DomainEvent.derived.add(UserUnbannedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserUnbannedDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(UserUnbannedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.mainId = params.mainId
    this.communityId = params.communityId
  }

  static fromAggregate (user:User): UserUnbannedDomainEvent {
    return new UserUnbannedDomainEvent({
      id: user.id.valueOf(),
      mainId: user.mainId.valueOf(),
      communityId: user.communityId.valueOf()
    })
  }

  toPrimitive (): UserUnbannedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserUnbannedDomainEventBody, eventId: string, occurredOn: Date): UserUnbannedDomainEvent {
    return new UserUnbannedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
