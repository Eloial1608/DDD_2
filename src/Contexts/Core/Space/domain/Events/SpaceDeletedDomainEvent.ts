import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Space } from '../Space'

type SpaceDeletedDomainEventBody = {
    readonly id: string
    readonly name: string
    readonly slug: string
    readonly parentId: Nullable<string>
    readonly icon: Nullable<string>
    readonly createdBy: string
    readonly accessibility: string
    readonly type: string
    readonly headerUrl: Nullable<string>
    readonly price: Nullable<{value: number, currency: string}>
    readonly communityId: string
    readonly createdAt: Date
    readonly deletedAt: Date
}

export class SpaceDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.space.v1.deleted'

  readonly id: string
  readonly name: string
  readonly slug: string
  readonly parentId: Nullable<string>
  readonly icon: Nullable<string>
  readonly createdBy: string
  readonly accessibility: string
  readonly type: string
  readonly headerUrl: Nullable<string>
  readonly price: Nullable<{value: number, currency: string}>
  readonly communityId: string
  readonly createdAt: Date
  readonly deletedAt: Date

  static {
    DomainEvent.derived.add(SpaceDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.deletedAt = params.deletedAt
    this.name = params.name
    this.parentId = params.parentId
    this.icon = params.icon
    this.slug = params.slug
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

  static fromAggregate (space: Space): SpaceDeletedDomainEvent {
    return new SpaceDeletedDomainEvent({
      id: space.id.valueOf(),
      createdAt: space.createdAt.valueOf(),
      deletedAt: space.deletedAt!.valueOf(),
      name: space.name.valueOf(),
      slug: space.slug.valueOf(),
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
