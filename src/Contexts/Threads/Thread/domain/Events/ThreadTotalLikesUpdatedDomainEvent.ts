import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Thread } from '../Thread'
import { Nullable } from '@Shared/domain/Nullable'

type ThreadTotalLikesUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class ThreadTotalLikesUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.threads.thread.v1.total-likes-updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(ThreadTotalLikesUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThreadTotalLikesUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ThreadTotalLikesUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (thread: Thread): ThreadTotalLikesUpdatedDomainEvent {
    return new ThreadTotalLikesUpdatedDomainEvent({
      id: thread.id.valueOf(),
      communityId: thread.communityId.valueOf(),
      userId: thread.userId.valueOf(),
      title: thread.title.valueOf(),
      bannerUrl: thread.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): ThreadTotalLikesUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThreadTotalLikesUpdatedDomainEventBody, eventId: string, occurredOn: Date): ThreadTotalLikesUpdatedDomainEvent {
    return new ThreadTotalLikesUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
