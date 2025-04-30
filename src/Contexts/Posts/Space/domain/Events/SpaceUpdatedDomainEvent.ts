import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Space } from '../Space'

type SpaceUpdatedDomainEventBody = {
    readonly id: string
    readonly accessibility: string
    readonly type: string
    readonly communityId: string
    readonly configuration: object
}

export class SpaceUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.posts.space.v1.updated'

  readonly id: string
  readonly accessibility: string
  readonly type: string
  readonly communityId: string
  readonly configuration: object

  static {
    DomainEvent.derived.add(SpaceUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.configuration = params.configuration
    this.type = params.type
    this.accessibility = params.accessibility
    this.communityId = params.communityId
  }

  static fromAggregate (space: Space): SpaceUpdatedDomainEvent {
    return new SpaceUpdatedDomainEvent({
      id: space.id.valueOf(),
      accessibility: space.accessibility.valueOf(),
      type: space.type.valueOf(),
      configuration: space.configuration.configuration,
      communityId: space.communityId.valueOf()

    })
  }

  toPrimitive (): SpaceUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SpaceUpdatedDomainEventBody, eventId: string, occurredOn: Date): SpaceUpdatedDomainEvent {
    return new SpaceUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
