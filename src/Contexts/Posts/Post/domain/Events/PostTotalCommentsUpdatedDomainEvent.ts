import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Post } from '../Post'
import { Nullable } from '@Shared/domain/Nullable'

type PostTotalCommentsUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class PostTotalCommentsUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.posts.post.v1.total-comments-updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(PostTotalCommentsUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: PostTotalCommentsUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(PostTotalCommentsUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (post: Post): PostTotalCommentsUpdatedDomainEvent {
    return new PostTotalCommentsUpdatedDomainEvent({
      id: post.id.valueOf(),
      communityId: post.communityId.valueOf(),
      userId: post.userId.valueOf(),
      title: post.title.valueOf(),
      bannerUrl: post.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): PostTotalCommentsUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: PostTotalCommentsUpdatedDomainEventBody, eventId: string, occurredOn: Date): PostTotalCommentsUpdatedDomainEvent {
    return new PostTotalCommentsUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
