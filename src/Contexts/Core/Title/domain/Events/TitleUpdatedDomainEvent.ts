import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Title } from '../Title'

type TitleUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
}

export class TitleUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.title.v1.updated'

  readonly id: string
  readonly communityId: string

  static {
    DomainEvent.derived.add(TitleUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: TitleUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(TitleUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
  }

  static fromAggregate (title: Title): TitleUpdatedDomainEvent {
    return new TitleUpdatedDomainEvent({
      id: title.id.valueOf(),
      communityId: title.communityId.valueOf()
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
