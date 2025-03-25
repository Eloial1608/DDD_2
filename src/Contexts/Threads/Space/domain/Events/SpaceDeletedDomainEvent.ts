import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Space } from '../Space'

type SpaceDeletedDomainEventBody = {
    readonly id: string
    readonly accessibility: string
    readonly type: string
    readonly communityId: string
    readonly configuration: object
}

export class SpaceDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Threads.space.v1.deleted'

  readonly id: string
  readonly accessibility: string
  readonly type: string
  readonly communityId: string
  readonly configuration: object

  static {
    DomainEvent.derived.add(SpaceDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.configuration = params.configuration
    this.type = params.type
    this.accessibility = params.accessibility
    this.communityId = params.communityId
  }

  static fromAggregate (space: Space): SpaceDeletedDomainEvent {
    return new SpaceDeletedDomainEvent({
      id: space.id.valueOf(),
      accessibility: space.accessibility.valueOf(),
      type: space.type.valueOf(),
      configuration: space.configuration.configuration,
      communityId: space.communityId.valueOf()

    })
  }

  toPrimitive (): SpaceDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SpaceDeletedDomainEventBody, eventId: string, occurredOn: Date): SpaceDeletedDomainEvent {
    return new SpaceDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
