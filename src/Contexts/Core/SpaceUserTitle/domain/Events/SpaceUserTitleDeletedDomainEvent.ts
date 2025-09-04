import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { SpaceUserTitle } from '../SpaceUserTitle'

type SpaceUserTitleDeletedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly titleId: string
    readonly userId: string
    readonly spaceId: string
}

export class SpaceUserTitleDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.space.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly titleId: string
  readonly userId: string
  readonly spaceId: string

  static {
    DomainEvent.derived.add(SpaceUserTitleDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceUserTitleDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceUserTitleDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.titleId = params.titleId
    this.userId = params.userId
    this.spaceId = params.spaceId
  }

  static fromAggregate (space: SpaceUserTitle): SpaceUserTitleDeletedDomainEvent {
    return new SpaceUserTitleDeletedDomainEvent({
      id: space.id.valueOf(),
      communityId: space.communityId.valueOf(),
      titleId: space.titleId.valueOf(),
      userId: space.userId.valueOf(),
      spaceId: space.spaceId.valueOf()
    })
  }

  toPrimitive (): SpaceUserTitleDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SpaceUserTitleDeletedDomainEventBody, eventId: string, occurredOn: Date): SpaceUserTitleDeletedDomainEvent {
    return new SpaceUserTitleDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
