import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Space } from '../Space'

type SpaceCreatedDomainEventBody = {
    readonly id: string
    readonly name: string
    readonly slug: string
    readonly parentId: Nullable<string>
    readonly icon: Nullable<string>
    readonly createdBy: string
    readonly accessibility: string
    readonly type: string
    readonly configuration: object
    readonly headerUrl: Nullable<string>
    readonly price: Nullable<{value: number, currency: string}>
    readonly communityId: string
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class SpaceCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.space.v1.created'

  readonly id: string
  readonly name: string
  readonly slug: string
  readonly parentId: Nullable<string>
  readonly icon: Nullable<string>
  readonly createdBy: string
  readonly configuration: object
  readonly accessibility: string
  readonly type: string
  readonly headerUrl: Nullable<string>
  readonly price: Nullable<{value: number, currency: string}>
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(SpaceCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.name = params.name
    this.parentId = params.parentId
    this.icon = params.icon
    this.slug = params.slug
    this.configuration = params.configuration
    this.headerUrl = params.headerUrl
    this.createdBy = params.createdBy
    this.accessibility = params.accessibility
    this.type = params.type
    this.price = params.price
      ? {
          value: params.price?.value,
          currency: params.price?.currency
        }
      : null
    this.communityId = params.communityId
  }

  static fromAggregate (space: Space): SpaceCreatedDomainEvent {
    return new SpaceCreatedDomainEvent({
      id: space.id.valueOf(),
      createdAt: space.createdAt.valueOf(),
      updatedAt: space.updatedAt.valueOf(),
      name: space.name.valueOf(),
      slug: space.slug.valueOf(),
      configuration: space.configuration.configuration,
      createdBy: space.createdBy.valueOf(),
      accessibility: space.accessibility.valueOf(),
      type: space.type.valueOf(),
      price: space.price?.value != null
        ? {
            value: space.price.value.valueOf(),
            currency: space.price.currency.valueOf()
          }
        : null,
      icon: space.icon?.valueOf(),
      parentId: space.parentId?.valueOf(),
      headerUrl: space.headerUrl?.valueOf(),
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
