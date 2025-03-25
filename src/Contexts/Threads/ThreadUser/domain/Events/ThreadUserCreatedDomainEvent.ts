import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { ThreadUser } from '../ThreadUser'

type ThreadUserCreatedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly threadId: string
    readonly createdAt: Date
}

export class ThreadUserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.threads.thread-user.v1.created'

  readonly id: string
  readonly userId: string
  readonly threadId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(ThreadUserCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThreadUserCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ThreadUserCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.threadId = params.threadId
    this.createdAt = params.createdAt
  }

  static fromAggregate (threadUser: ThreadUser): ThreadUserCreatedDomainEvent {
    return new ThreadUserCreatedDomainEvent({
      id: threadUser.id.valueOf(),
      userId: threadUser.userId.valueOf(),
      threadId: threadUser.threadId.valueOf(),
      createdAt: threadUser.createdAt.valueOf()
    })
  }

  toPrimitive (): ThreadUserCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThreadUserCreatedDomainEventBody, eventId: string, occurredOn: Date): ThreadUserCreatedDomainEvent {
    return new ThreadUserCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
