import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Comment } from '../Comment'

type CommentUpdatedDomainEventBody = {
    readonly id: string
    readonly mediaId: string
    readonly userId: string
    readonly createdAt: Date
}

export class CommentUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.Media.comment.v1.updated'

  readonly id: string
  readonly mediaId: string
  readonly userId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(CommentUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommentUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommentUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.mediaId = params.mediaId
    this.createdAt = params.createdAt
  }

  static fromAggregate (comment: Comment): CommentUpdatedDomainEvent {
    return new CommentUpdatedDomainEvent({
      id: comment.id.valueOf(),
      mediaId: comment.mediaId.valueOf(),
      createdAt: comment.createdAt.valueOf(),
      userId: comment.userId.valueOf()

    })
  }

  toPrimitive (): CommentUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommentUpdatedDomainEventBody, eventId: string, occurredOn: Date): CommentUpdatedDomainEvent {
    return new CommentUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
