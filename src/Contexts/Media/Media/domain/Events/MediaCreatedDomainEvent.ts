import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Media } from '../Media'
import { Nullable } from '@Shared/domain/Nullable'

type MediaCreatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class MediaCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.Media.media.v1.created'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(MediaCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: MediaCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(MediaCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (media: Media): MediaCreatedDomainEvent {
    return new MediaCreatedDomainEvent({
      id: media.id.valueOf(),
      communityId: media.communityId.valueOf(),
      userId: media.userId.valueOf(),
      title: media.title.valueOf(),
      bannerUrl: media.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): MediaCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: MediaCreatedDomainEventBody, eventId: string, occurredOn: Date): MediaCreatedDomainEvent {
    return new MediaCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
