import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { UserTitle } from '../UserTitle'

type UserTitleDeletedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly titleId: string
    readonly userId: string
}

export class UserTitleDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.space.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly titleId: string
  readonly userId: string

  static {
    DomainEvent.derived.add(UserTitleDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserTitleDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserTitleDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.titleId = params.titleId
    this.userId = params.userId
  }

  static fromAggregate (space: UserTitle): UserTitleDeletedDomainEvent {
    return new UserTitleDeletedDomainEvent({
      id: space.id.valueOf(),
      communityId: space.communityId.valueOf(),
      titleId: space.titleId.valueOf(),
      userId: space.userId.valueOf()
    })
  }

  toPrimitive (): UserTitleDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserTitleDeletedDomainEventBody, eventId: string, occurredOn: Date): UserTitleDeletedDomainEvent {
    return new UserTitleDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
