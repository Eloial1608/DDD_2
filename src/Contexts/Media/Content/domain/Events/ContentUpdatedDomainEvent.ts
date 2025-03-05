import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Content } from '../Content'

type ContentUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly mediaId: string
    readonly type: string
    readonly url: string
}

export class ContentUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.media.content.v1.updated'

  readonly id: string
  readonly communityId: string
  readonly mediaId: string
  readonly type: string
  readonly url: string

  static {
    DomainEvent.derived.add(ContentUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ContentUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ContentUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.mediaId = params.mediaId
    this.type = params.type
    this.url = params.url
  }

  static fromAggregate (content: Content): ContentUpdatedDomainEvent {
    return new ContentUpdatedDomainEvent({
      id: content.id.valueOf(),
      communityId: content.communityId.valueOf(),
      mediaId: content.mediaId.valueOf(),
      type: content.type.valueOf(),
      url: content.url.valueOf()

    })
  }

  toPrimitive (): ContentUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ContentUpdatedDomainEventBody, eventId: string, occurredOn: Date): ContentUpdatedDomainEvent {
    return new ContentUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
