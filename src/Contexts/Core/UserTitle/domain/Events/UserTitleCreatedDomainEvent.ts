import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { UserTitle } from '../UserTitle'

type UserTitleCreatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly titleId: string
    readonly userId: string
}

export class UserTitleCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.space.v1.created'

  readonly id: string
  readonly communityId: string
  readonly titleId: string
  readonly userId: string

  static {
    DomainEvent.derived.add(UserTitleCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserTitleCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserTitleCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.titleId = params.titleId
    this.userId = params.userId
  }

  static fromAggregate (space: UserTitle): UserTitleCreatedDomainEvent {
    return new UserTitleCreatedDomainEvent({
      id: space.id.valueOf(),
      communityId: space.communityId.valueOf(),
      titleId: space.titleId.valueOf(),
      userId: space.userId.valueOf()
    })
  }

  toPrimitive (): UserTitleCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserTitleCreatedDomainEventBody, eventId: string, occurredOn: Date): UserTitleCreatedDomainEvent {
    return new UserTitleCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
