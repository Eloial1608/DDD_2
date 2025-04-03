import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Space } from '../Space'

type SpaceCreatedDomainEventBody = {
    readonly id: string
    readonly accessibility: string
    readonly type: string
    readonly communityId: string
    readonly configuration: object
}

export class SpaceCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Course.space.v1.created'

  readonly id: string
  readonly accessibility: string
  readonly type: string
  readonly communityId: string
  readonly configuration: object

  static {
    DomainEvent.derived.add(SpaceCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.configuration = params.configuration
    this.type = params.type
    this.accessibility = params.accessibility
    this.communityId = params.communityId
  }

  static fromAggregate (space: Space): SpaceCreatedDomainEvent {
    return new SpaceCreatedDomainEvent({
      id: space.id.valueOf(),
      accessibility: space.accessibility.valueOf(),
      type: space.type.valueOf(),
      configuration: space.configuration.configuration,
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
