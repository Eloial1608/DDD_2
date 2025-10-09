import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Title } from '../Title'
import { Nullable } from '@Shared/domain/Nullable'

type TitleCreatedDomainEventBody = {
    readonly id: string,
    readonly communityId: string,
    readonly name: string,
    readonly titleImageUrl: Nullable<string>
}

export class TitleCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.title.v1.created'

  readonly id: string
  readonly communityId: string
  readonly name: string
  readonly titleImageUrl: Nullable<string>

  static {
    DomainEvent.derived.add(TitleCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: TitleCreatedDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(TitleCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.name = params.name
    this.titleImageUrl = params.titleImageUrl
  }

  static fromAggregate (title: Title): TitleCreatedDomainEvent {
    return new TitleCreatedDomainEvent({
      id: title.id.valueOf(),
      communityId: title.communityId.valueOf(),
      name: title.name.valueOf(),
      titleImageUrl: title.titleImageUrl?.valueOf()
    })
  }

  toPrimitive (): TitleCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes:TitleCreatedDomainEventBody, eventId: string, occurredOn: Date) : TitleCreatedDomainEvent {
    return new TitleCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
