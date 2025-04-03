import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Like } from '../Like'

type LikeCreatedDomainEventBody = {
    readonly id: string
    readonly postId: string
    readonly userId: string
    readonly createdAt: Date
}

export class LikeCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.posts.like.v1.created'

  readonly id: string
  readonly postId: string
  readonly userId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(LikeCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: LikeCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(LikeCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.postId = params.postId
    this.createdAt = params.createdAt
  }

  static fromAggregate (like: Like): LikeCreatedDomainEvent {
    return new LikeCreatedDomainEvent({
      id: like.id.valueOf(),
      postId: like.postId.valueOf(),
      createdAt: like.createdAt.valueOf(),
      userId: like.userId.valueOf()

    })
  }

  toPrimitive (): LikeCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: LikeCreatedDomainEventBody, eventId: string, occurredOn: Date): LikeCreatedDomainEvent {
    return new LikeCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
