import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Media } from '../Media'
import { Nullable } from '@Shared/domain/Nullable'

type MediaAuthorUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class MediaAuthorUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Media.media.v1.author-updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(MediaAuthorUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: MediaAuthorUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(MediaAuthorUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (media: Media): MediaAuthorUpdatedDomainEvent {
    return new MediaAuthorUpdatedDomainEvent({
      id: media.id.valueOf(),
      communityId: media.communityId.valueOf(),
      userId: media.userId.valueOf(),
      title: media.title.valueOf(),
      bannerUrl: media.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): MediaAuthorUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: MediaAuthorUpdatedDomainEventBody, eventId: string, occurredOn: Date): MediaAuthorUpdatedDomainEvent {
    return new MediaAuthorUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
