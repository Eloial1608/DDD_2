import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { MediaUser } from '../MediaUser'

type MediaUserCreatedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly mediaId: string
    readonly createdAt: Date
}

export class MediaUserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.Media.media-user.v1.created'

  readonly id: string
  readonly userId: string
  readonly mediaId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(MediaUserCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: MediaUserCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(MediaUserCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.mediaId = params.mediaId
    this.createdAt = params.createdAt
  }

  static fromAggregate (mediaUser: MediaUser): MediaUserCreatedDomainEvent {
    return new MediaUserCreatedDomainEvent({
      id: mediaUser.id.valueOf(),
      userId: mediaUser.userId.valueOf(),
      mediaId: mediaUser.mediaId.valueOf(),
      createdAt: mediaUser.createdAt.valueOf()
    })
  }

  toPrimitive (): MediaUserCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: MediaUserCreatedDomainEventBody, eventId: string, occurredOn: Date): MediaUserCreatedDomainEvent {
    return new MediaUserCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
