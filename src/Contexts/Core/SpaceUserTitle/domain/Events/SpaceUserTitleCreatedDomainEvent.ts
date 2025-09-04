import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { SpaceUserTitle } from '../SpaceUserTitle'

type SpaceUserTitleCreatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly titleId: string
    readonly userId: string
    readonly spaceId: string
}

export class SpaceUserTitleCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.space.v1.created'

  readonly id: string
  readonly communityId: string
  readonly titleId: string
  readonly userId: string
  readonly spaceId: string

  static {
    DomainEvent.derived.add(SpaceUserTitleCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceUserTitleCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceUserTitleCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.titleId = params.titleId
    this.userId = params.userId
    this.spaceId = params.spaceId
  }

  static fromAggregate (space: SpaceUserTitle): SpaceUserTitleCreatedDomainEvent {
    return new SpaceUserTitleCreatedDomainEvent({
      id: space.id.valueOf(),
      communityId: space.communityId.valueOf(),
      titleId: space.titleId.valueOf(),
      userId: space.userId.valueOf(),
      spaceId: space.spaceId.valueOf()
    })
  }

  toPrimitive (): SpaceUserTitleCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SpaceUserTitleCreatedDomainEventBody, eventId: string, occurredOn: Date): SpaceUserTitleCreatedDomainEvent {
    return new SpaceUserTitleCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
