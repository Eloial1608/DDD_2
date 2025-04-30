import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Post } from '../Post'
import { Nullable } from '@Shared/domain/Nullable'

type PostUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
    readonly isPaid: boolean
    readonly price: Nullable<{value: number, currency: string}>
}

export class PostUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.posts.post.v1.updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>
  readonly isPaid: boolean
  readonly price: Nullable<{value: number, currency: string}>

  static {
    DomainEvent.derived.add(PostUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: PostUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(PostUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
    this.isPaid = params.isPaid
    this.price = params.price
  }

  static fromAggregate (post: Post): PostUpdatedDomainEvent {
    return new PostUpdatedDomainEvent({
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

  toPrimitive (): PostUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: PostUpdatedDomainEventBody, eventId: string, occurredOn: Date): PostUpdatedDomainEvent {
    return new PostUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
