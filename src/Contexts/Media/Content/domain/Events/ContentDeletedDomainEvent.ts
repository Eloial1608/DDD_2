import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Content } from '../Content'

type ContentDeletedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly mediaId: string
    readonly type: string
    readonly url: string
}

export class ContentDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.media.content.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly mediaId: string
  readonly type: string
  readonly url: string

  static {
    DomainEvent.derived.add(ContentDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: ContentDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ContentDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.mediaId = params.mediaId
    this.type = params.type
    this.url = params.url
  }

  static fromAggregate (content: Content): ContentDeletedDomainEvent {
    return new ContentDeletedDomainEvent({
      id: content.id.valueOf(),
      communityId: content.communityId.valueOf(),
      mediaId: content.mediaId.valueOf(),
      type: content.type.valueOf(),
      url: content.url.valueOf()

    })
  }

  toPrimitive (): ContentDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ContentDeletedDomainEventBody, eventId: string, occurredOn: Date): ContentDeletedDomainEvent {
    return new ContentDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
