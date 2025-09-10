import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { UserTitle } from '../UserTitle'

type UserTitleUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly titleId: string
    readonly userId: string
}

export class UserTitleUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.space.v1.updated'

  readonly id: string
  readonly communityId: string
  readonly titleId: string
  readonly userId: string

  static {
    DomainEvent.derived.add(UserTitleUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserTitleUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserTitleUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.titleId = params.titleId
    this.userId = params.userId
  }

  static fromAggregate (space: UserTitle): UserTitleUpdatedDomainEvent {
    return new UserTitleUpdatedDomainEvent({
      id: space.id.valueOf(),
      communityId: space.communityId.valueOf(),
      titleId: space.titleId.valueOf(),
      userId: space.userId.valueOf()
    })
  }

  toPrimitive (): UserTitleUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserTitleUpdatedDomainEventBody, eventId: string, occurredOn: Date): UserTitleUpdatedDomainEvent {
    return new UserTitleUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
