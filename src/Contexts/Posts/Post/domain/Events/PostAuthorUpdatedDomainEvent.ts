import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Post } from '../Post'
import { Nullable } from '@Shared/domain/Nullable'

type PostAuthorUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class PostAuthorUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.posts.post.v1.total-likes-updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(PostAuthorUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: PostAuthorUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(PostAuthorUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (post: Post): PostAuthorUpdatedDomainEvent {
    return new PostAuthorUpdatedDomainEvent({
      id: post.id.valueOf(),
      communityId: post.communityId.valueOf(),
      userId: post.userId.valueOf(),
      title: post.title.valueOf(),
      bannerUrl: post.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): PostAuthorUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: PostAuthorUpdatedDomainEventBody, eventId: string, occurredOn: Date): PostAuthorUpdatedDomainEvent {
    return new PostAuthorUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
