import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Media } from '../Media'
import { Nullable } from '@Shared/domain/Nullable'

type MediaDeletedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class MediaDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Media.media.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(MediaDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: MediaDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(MediaDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (media: Media): MediaDeletedDomainEvent {
    return new MediaDeletedDomainEvent({
      id: media.id.valueOf(),
      communityId: media.communityId.valueOf(),
      userId: media.userId.valueOf(),
      title: media.title.valueOf(),
      bannerUrl: media.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): MediaDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: MediaDeletedDomainEventBody, eventId: string, occurredOn: Date): MediaDeletedDomainEvent {
    return new MediaDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
