import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Post } from '../Post'
import { Nullable } from '@Shared/domain/Nullable'

type PostCreatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly isPaid: boolean
    readonly price: Nullable<{value: number, currency: string}>
    readonly bannerUrl: Nullable<string>
}

export class PostCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.posts.post.v1.created'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly isPaid: boolean
  readonly price: Nullable<{value: number, currency: string}>
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(PostCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: PostCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(PostCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
    this.isPaid = params.isPaid
    this.price = params.price
  }

  static fromAggregate (post: Post): PostCreatedDomainEvent {
    return new PostCreatedDomainEvent({
      id: post.id.valueOf(),
      communityId: post.communityId.valueOf(),
      userId: post.userId.valueOf(),
      title: post.title.valueOf(),
      isPaid: post.isPaid.valueOf(),
      price: post.price?.value != null
        ? {
            value: post.price.value.valueOf(),
            currency: post.price.currency.valueOf()
          }
        : undefined,
      bannerUrl: post.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): PostCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: PostCreatedDomainEventBody, eventId: string, occurredOn: Date): PostCreatedDomainEvent {
    return new PostCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
