import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Title } from '../Title'

type TitleDeletedDomainEventBody = {
    readonly id: string
    readonly communityId:string
    readonly createdAt?: Date
    readonly updatedAt?: Date
}

export class TitleDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.title.v1.deleted'

  readonly id: string
  readonly communityId: string

  static {
    DomainEvent.derived.add(TitleDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: TitleDeletedDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(TitleDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
  }

  static fromAggregate (title:Title): TitleDeletedDomainEvent {
    return new TitleDeletedDomainEvent({
      id: title.id.valueOf(),
      communityId: title.communityId.valueOf()
    })
  }

  toPrimitive (): TitleDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: TitleDeletedDomainEventBody, eventId: string, occurredOn: Date): TitleDeletedDomainEvent {
    return new TitleDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
