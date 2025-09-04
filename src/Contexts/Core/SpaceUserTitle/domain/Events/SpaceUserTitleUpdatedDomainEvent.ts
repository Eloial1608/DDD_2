import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { SpaceUserTitle } from '../SpaceUserTitle'

type SpaceUserTitleUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly titleId: string
    readonly userId: string
    readonly spaceId: string
}

export class SpaceUserTitleUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.space.v1.updated'

  readonly id: string
  readonly communityId: string
  readonly titleId: string
  readonly userId: string
  readonly spaceId: string

  static {
    DomainEvent.derived.add(SpaceUserTitleUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceUserTitleUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceUserTitleUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.titleId = params.titleId
    this.userId = params.userId
    this.spaceId = params.spaceId
  }

  static fromAggregate (space: SpaceUserTitle): SpaceUserTitleUpdatedDomainEvent {
    return new SpaceUserTitleUpdatedDomainEvent({
      id: space.id.valueOf(),
      communityId: space.communityId.valueOf(),
      titleId: space.titleId.valueOf(),
      userId: space.userId.valueOf(),
      spaceId: space.spaceId.valueOf()
    })
  }

  toPrimitive (): SpaceUserTitleUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SpaceUserTitleUpdatedDomainEventBody, eventId: string, occurredOn: Date): SpaceUserTitleUpdatedDomainEvent {
    return new SpaceUserTitleUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
