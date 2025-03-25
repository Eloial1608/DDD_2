import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Post } from '../Post'
import { Nullable } from '@Shared/domain/Nullable'

type PostDeletedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class PostDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.posts.post.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(PostDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: PostDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(PostDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (post: Post): PostDeletedDomainEvent {
    return new PostDeletedDomainEvent({
      id: post.id.valueOf(),
      communityId: post.communityId.valueOf(),
      userId: post.userId.valueOf(),
      title: post.title.valueOf(),
      bannerUrl: post.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): PostDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: PostDeletedDomainEventBody, eventId: string, occurredOn: Date): PostDeletedDomainEvent {
    return new PostDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
