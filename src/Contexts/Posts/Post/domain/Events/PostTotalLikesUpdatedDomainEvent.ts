import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Post } from '../Post'
import { Nullable } from '@Shared/domain/Nullable'

type PostTotalLikesUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class PostTotalLikesUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.posts.post.v1.total-likes-updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(PostTotalLikesUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: PostTotalLikesUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(PostTotalLikesUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (post: Post): PostTotalLikesUpdatedDomainEvent {
    return new PostTotalLikesUpdatedDomainEvent({
      id: post.id.valueOf(),
      communityId: post.communityId.valueOf(),
      userId: post.userId.valueOf(),
      title: post.title.valueOf(),
      bannerUrl: post.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): PostTotalLikesUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: PostTotalLikesUpdatedDomainEventBody, eventId: string, occurredOn: Date): PostTotalLikesUpdatedDomainEvent {
    return new PostTotalLikesUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
