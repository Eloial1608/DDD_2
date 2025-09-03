import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Title } from '../Title'

type TitleCreatedDomainEventBody = {
    readonly id: string,
    readonly communityId: string,
}

export class TitleCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.title.v1.created'

  readonly id: string
  readonly communityId: string

  static {
    DomainEvent.derived.add(TitleCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: TitleCreatedDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(TitleCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
  }

  static fromAggregate (title: Title): TitleCreatedDomainEvent {
    return new TitleCreatedDomainEvent({
      id: title.id.valueOf(),
      communityId: title.communityId.valueOf(),
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
