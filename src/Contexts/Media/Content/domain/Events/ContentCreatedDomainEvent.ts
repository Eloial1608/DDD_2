import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Content } from '../Content'

type ContentCreatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly mediaId: string
    readonly type: string
    readonly url: string
}

export class ContentCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.media.content.v1.created'

  readonly id: string
  readonly communityId: string
  readonly mediaId: string
  readonly type: string
  readonly url: string

  static {
    DomainEvent.derived.add(ContentCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ContentCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ContentCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.mediaId = params.mediaId
    this.type = params.type
    this.url = params.url
  }

  static fromAggregate (content: Content): ContentCreatedDomainEvent {
    return new ContentCreatedDomainEvent({
      id: content.id.valueOf(),
      communityId: content.communityId.valueOf(),
      mediaId: content.mediaId.valueOf(),
      type: content.type.valueOf(),
      url: content.url.valueOf()

    })
  }

  toPrimitive (): ContentCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ContentCreatedDomainEventBody, eventId: string, occurredOn: Date): ContentCreatedDomainEvent {
    return new ContentCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
