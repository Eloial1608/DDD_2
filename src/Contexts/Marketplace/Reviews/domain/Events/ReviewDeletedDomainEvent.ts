import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Review } from '../Review'
import { Nullable } from '@Shared/domain/Nullable'

type ReviewDeletedDomainEventBody = {
    readonly id: string
    readonly productId: string
    readonly content: Nullable<string>
    readonly rating: number
    readonly userId: string
    readonly createdAt: Date
}

export class ReviewDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.marketplace.review.v1.deleted'

  readonly id: string
  readonly productId: string
  readonly content: Nullable<string>
  readonly rating: number
  readonly userId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(ReviewDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: ReviewDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ReviewDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.productId = params.productId
    this.content = params.content
    this.rating = params.rating
    this.userId = params.userId
    this.createdAt = params.createdAt
  }

  static fromAggregate (review: Review): ReviewDeletedDomainEvent {
    return new ReviewDeletedDomainEvent({
      id: review.id.valueOf(),
      productId: review.productId.valueOf(),
      content: review.content?.valueOf(),
      rating: review.rating.valueOf(),
      userId: review.userId.valueOf(),
      createdAt: review.createdAt.valueOf()
    })
  }

  toPrimitive (): ReviewDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ReviewDeletedDomainEventBody, eventId: string, occurredOn: Date): ReviewDeletedDomainEvent {
    return new ReviewDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
