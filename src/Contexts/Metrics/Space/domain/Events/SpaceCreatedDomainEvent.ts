import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Space } from '../Space'

type SpaceCreatedDomainEventBody = {
    readonly id: string
    readonly type: string
    readonly communityId: string
}

export class SpaceCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Metrics.space.v1.created'

  readonly id: string
  readonly type: string
  readonly communityId: string

  static {
    DomainEvent.derived.add(SpaceCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.type = params.type
    this.communityId = params.communityId
  }

  static fromAggregate (space: Space): SpaceCreatedDomainEvent {
    return new SpaceCreatedDomainEvent({
      id: space.id.valueOf(),
      type: space.type.valueOf(),
      communityId: space.communityId.valueOf()

    })
  }

  toPrimitive (): SpaceCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SpaceCreatedDomainEventBody, eventId: string, occurredOn: Date): SpaceCreatedDomainEvent {
    return new SpaceCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
