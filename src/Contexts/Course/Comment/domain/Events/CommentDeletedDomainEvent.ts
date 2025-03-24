import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Comment } from '../Comment'

type CommentDeletedDomainEventBody = {
    readonly id: string
    readonly courseId: string
    readonly userId: string
    readonly createdAt: Date
}

export class CommentDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.Course.comment.v1.deleted'

  readonly id: string
  readonly courseId: string
  readonly userId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(CommentDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommentDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommentDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.courseId = params.courseId
    this.createdAt = params.createdAt
  }

  static fromAggregate (comment: Comment): CommentDeletedDomainEvent {
    return new CommentDeletedDomainEvent({
      id: comment.id.valueOf(),
      courseId: comment.courseId.valueOf(),
      createdAt: comment.createdAt.valueOf(),
      userId: comment.userId.valueOf()

    })
  }

  toPrimitive (): CommentDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommentDeletedDomainEventBody, eventId: string, occurredOn: Date): CommentDeletedDomainEvent {
    return new CommentDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
