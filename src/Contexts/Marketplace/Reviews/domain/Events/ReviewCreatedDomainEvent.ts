import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Review } from '../Review'
import { Nullable } from '@Shared/domain/Nullable'

type ReviewCreatedDomainEventBody = {
    readonly id: string
    readonly productId: string
    readonly content: Nullable<string>
    readonly rating: number
    readonly userId: string
    readonly createdAt: Date
}

export class ReviewCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.marketplace.review.v1.created'

  readonly id: string
  readonly productId: string
  readonly content: Nullable<string>
  readonly rating: number
  readonly userId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(ReviewCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ReviewCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ReviewCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.productId = params.productId
    this.content = params.content
    this.rating = params.rating
    this.userId = params.userId
    this.createdAt = params.createdAt
  }

  static fromAggregate (review: Review): ReviewCreatedDomainEvent {
    return new ReviewCreatedDomainEvent({
      id: review.id.valueOf(),
      productId: review.productId.valueOf(),
      content: review.content?.valueOf(),
      rating: review.rating.valueOf(),
      userId: review.userId.valueOf(),
      createdAt: review.createdAt.valueOf()
    })
  }

  toPrimitive (): ReviewCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ReviewCreatedDomainEventBody, eventId: string, occurredOn: Date): ReviewCreatedDomainEvent {
    return new ReviewCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
