import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { PostUser } from '../PostUser'

type PostUserCreatedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly postId: string
    readonly createdAt: Date
}

export class PostUserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.posts.post-user.v1.created'

  readonly id: string
  readonly userId: string
  readonly postId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(PostUserCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: PostUserCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(PostUserCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.postId = params.postId
    this.createdAt = params.createdAt
  }

  static fromAggregate (postUser: PostUser): PostUserCreatedDomainEvent {
    return new PostUserCreatedDomainEvent({
      id: postUser.id.valueOf(),
      userId: postUser.userId.valueOf(),
      postId: postUser.postId.valueOf(),
      createdAt: postUser.createdAt.valueOf()
    })
  }

  toPrimitive (): PostUserCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: PostUserCreatedDomainEventBody, eventId: string, occurredOn: Date): PostUserCreatedDomainEvent {
    return new PostUserCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
