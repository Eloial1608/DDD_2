import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Thread } from '../Thread'
import { Nullable } from '@Shared/domain/Nullable'

type ThreadTotalThreadsUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
    readonly parentThreadId: Nullable<string>
}

export class ThreadTotalThreadsUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.threads.thread.v1.total-threads-updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>
  readonly parentThreadId: Nullable<string>

  static {
    DomainEvent.derived.add(ThreadTotalThreadsUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThreadTotalThreadsUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ThreadTotalThreadsUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
    this.parentThreadId = params.parentThreadId
  }

  static fromAggregate (thread: Thread): ThreadTotalThreadsUpdatedDomainEvent {
    return new ThreadTotalThreadsUpdatedDomainEvent({
      id: thread.id.valueOf(),
      communityId: thread.communityId.valueOf(),
      userId: thread.userId.valueOf(),
      title: thread.title.valueOf(),
      bannerUrl: thread.bannerUrl?.valueOf(),
      parentThreadId: thread.parentThreadId?.valueOf()

    })
  }

  toPrimitive (): ThreadTotalThreadsUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThreadTotalThreadsUpdatedDomainEventBody, eventId: string, occurredOn: Date): ThreadTotalThreadsUpdatedDomainEvent {
    return new ThreadTotalThreadsUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
