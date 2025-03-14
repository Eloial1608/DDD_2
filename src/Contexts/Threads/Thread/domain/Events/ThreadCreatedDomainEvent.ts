import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Thread } from '../Thread'
import { Nullable } from '@Shared/domain/Nullable'

type ThreadCreatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
    readonly threadParentId: Nullable<string>
}

export class ThreadCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.Thread.thread.v1.created'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>
  readonly threadParentId: Nullable<string>

  static {
    DomainEvent.derived.add(ThreadCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThreadCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ThreadCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
    this.threadParentId = params.threadParentId
  }

  static fromAggregate (thread: Thread): ThreadCreatedDomainEvent {
    return new ThreadCreatedDomainEvent({
      id: thread.id.valueOf(),
      communityId: thread.communityId.valueOf(),
      userId: thread.userId.valueOf(),
      title: thread.title.valueOf(),
      bannerUrl: thread.bannerUrl?.valueOf(),
      threadParentId: thread.parentThreadId?.valueOf()

    })
  }

  toPrimitive (): ThreadCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThreadCreatedDomainEventBody, eventId: string, occurredOn: Date): ThreadCreatedDomainEvent {
    return new ThreadCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
