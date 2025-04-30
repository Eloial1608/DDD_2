import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Media } from '../Media'
import { Nullable } from '@Shared/domain/Nullable'

type MediaTotalCommentsUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class MediaTotalCommentsUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Media.media.v1.total-comments-updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(MediaTotalCommentsUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: MediaTotalCommentsUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(MediaTotalCommentsUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (media: Media): MediaTotalCommentsUpdatedDomainEvent {
    return new MediaTotalCommentsUpdatedDomainEvent({
      id: media.id.valueOf(),
      communityId: media.communityId.valueOf(),
      userId: media.userId.valueOf(),
      title: media.title.valueOf(),
      bannerUrl: media.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): MediaTotalCommentsUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: MediaTotalCommentsUpdatedDomainEventBody, eventId: string, occurredOn: Date): MediaTotalCommentsUpdatedDomainEvent {
    return new MediaTotalCommentsUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
