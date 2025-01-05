import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Comment } from '../Comment'
import { Nullable } from '@Shared/domain/Nullable'

type CommentCreatedDomainEventBody = {
    readonly id: string,
    readonly mediaId: string,
    readonly author: {
        id: string,
        mainId: string,
        name: string,
        username: string,
        pictureUrl: Nullable<string>,
        bannerUrl: Nullable<string>
    },
    readonly userId: string,
    readonly content: string
}

export class CommentCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.Media.comment.v1.created'

  readonly id: string
  readonly mediaId: string
  readonly author: {
        id: string,
        mainId: string,
        name: string,
        username: string,
        pictureUrl: Nullable<string>,
        bannerUrl: Nullable<string>
    }

  readonly userId: string
  readonly content: string

  static {
    DomainEvent.derived.add(CommentCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommentCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommentCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.mediaId = params.mediaId
    this.author = params.author
    this.userId = params.userId
    this.content = params.content
  }

  static fromAggregate (comment: Comment): CommentCreatedDomainEvent {
    return new CommentCreatedDomainEvent({
      id: comment.id.valueOf(),
      mediaId: comment.mediaId.valueOf(),
      author: comment.author.toPrimitives(),
      userId: comment.userId.valueOf(),
      content: comment.content.valueOf()
    })
  }

  toPrimitive (): CommentCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommentCreatedDomainEventBody, eventId: string, occurredOn: Date): CommentCreatedDomainEvent {
    return new CommentCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
