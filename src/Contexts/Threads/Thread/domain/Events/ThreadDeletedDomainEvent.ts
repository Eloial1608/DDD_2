import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Thread } from '../Thread'

type ThreadDeletedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly threadParentId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class ThreadDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.threads.thread.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly threadParentId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(ThreadDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params:ThreadDeletedDomainEventBody & {eventId?:string, occurredOn?:Date}) {
    super(ThreadDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.threadParentId = params.threadParentId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (thread: Thread): ThreadDeletedDomainEvent {
    return new ThreadDeletedDomainEvent({
      id: thread.id.valueOf(),
      communityId: thread.communityId.valueOf(),
      threadParentId: thread.parentThreadId.valueOf(),
      userId: thread.userId.valueOf(),
      title: thread.title.valueOf(),
      bannerUrl: thread.bannerUrl?.valueOf()
    })
  }

  toPrimitive (): ThreadDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThreadDeletedDomainEventBody, eventId: string, occurredOn: Date): ThreadDeletedDomainEventBody {
    return new ThreadDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
