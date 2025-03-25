import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Thread } from '../Thread'
import { Nullable } from '@Shared/domain/Nullable'

type ThreadAuthorUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class ThreadAuthorUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.threads.thread.v1.total-likes-updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(ThreadAuthorUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThreadAuthorUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ThreadAuthorUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (thread: Thread): ThreadAuthorUpdatedDomainEvent {
    return new ThreadAuthorUpdatedDomainEvent({
      id: thread.id.valueOf(),
      communityId: thread.communityId.valueOf(),
      userId: thread.userId.valueOf(),
      title: thread.title.valueOf(),
      bannerUrl: thread.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): ThreadAuthorUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThreadAuthorUpdatedDomainEventBody, eventId: string, occurredOn: Date): ThreadAuthorUpdatedDomainEvent {
    return new ThreadAuthorUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
