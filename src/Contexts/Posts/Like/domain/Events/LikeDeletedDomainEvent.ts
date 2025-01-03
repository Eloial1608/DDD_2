import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Like } from '../Like'

type LikeDeletedDomainEventBody = {
    readonly id: string
    readonly postId: string
    readonly userId: string
    readonly createdAt: Date
}

export class LikeDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.posts.like.v1.deleted'

  readonly id: string
  readonly postId: string
  readonly userId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(LikeDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: LikeDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(LikeDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.postId = params.postId
    this.createdAt = params.createdAt
  }

  static fromAggregate (like: Like): LikeDeletedDomainEvent {
    return new LikeDeletedDomainEvent({
      id: like.id.valueOf(),
      postId: like.postId.valueOf(),
      createdAt: like.createdAt.valueOf(),
      userId: like.userId.valueOf()

    })
  }

  toPrimitive (): LikeDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: LikeDeletedDomainEventBody, eventId: string, occurredOn: Date): LikeDeletedDomainEvent {
    return new LikeDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
