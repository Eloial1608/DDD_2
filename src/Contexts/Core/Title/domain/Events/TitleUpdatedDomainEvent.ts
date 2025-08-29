import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Title } from '../Title'

type TitleUpdatedDomainEventBody = {
    readonly id: string
    readonly name: string
    readonly communityId: string
    readonly titleImageUrl: Nullable<string>
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class TitleUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.title.v1.updated'

  readonly id: string
  readonly name: string
  readonly communityId: string
  readonly titleImageUrl: Nullable<string>
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(TitleUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: TitleUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(TitleUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.name = params.name
    this.titleImageUrl = params.titleImageUrl
    this.communityId = params.communityId
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }

  static fromAggregate (title: Title): TitleUpdatedDomainEvent {
    return new TitleUpdatedDomainEvent({
      id: title.id.valueOf(),
      name: title.name.valueOf(),
      titleImageUrl: title.titleImageUrl?.valueOf(),
      communityId: title.communityId.valueOf(),
      createdAt: title.createdAt.valueOf(),
      updatedAt: title.updatedAt.valueOf(),
    })
  }
  toPrimitive (): TitleUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: TitleUpdatedDomainEventBody, eventId: string, occurredOn: Date): TitleUpdatedDomainEvent {
    return new TitleUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
