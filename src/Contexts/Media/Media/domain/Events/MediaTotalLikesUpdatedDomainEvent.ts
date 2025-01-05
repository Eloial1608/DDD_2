import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Media } from '../Media'
import { Nullable } from '@Shared/domain/Nullable'

type MediaTotalLikesUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class MediaTotalLikesUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.Media.media.v1.total-likes-updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(MediaTotalLikesUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: MediaTotalLikesUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(MediaTotalLikesUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (media: Media): MediaTotalLikesUpdatedDomainEvent {
    return new MediaTotalLikesUpdatedDomainEvent({
      id: media.id.valueOf(),
      communityId: media.communityId.valueOf(),
      userId: media.userId.valueOf(),
      title: media.title.valueOf(),
      bannerUrl: media.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): MediaTotalLikesUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: MediaTotalLikesUpdatedDomainEventBody, eventId: string, occurredOn: Date): MediaTotalLikesUpdatedDomainEvent {
    return new MediaTotalLikesUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
