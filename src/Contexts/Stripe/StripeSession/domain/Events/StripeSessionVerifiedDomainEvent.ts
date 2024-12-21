import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { StripeSession } from '../StripeSession'
import { Nullable } from '@Shared/domain/Nullable'

type StripeSessionVerifiedDomainEventBody = {
  readonly id: string
  readonly accountId: string
  readonly stripeId: string
  readonly url: string
  readonly customerId: string
  readonly product: {
    readonly id: string
    readonly type: string
    readonly priceId: string
    readonly renovationInterval?: Nullable<number>
    readonly renovationType?: Nullable<string>
  }
  readonly price: string
  readonly completed: boolean
  readonly successUrl: string
  readonly failUrl: string

}

export class StripeSessionVerifiedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.stripe-session.v1.verified'

  readonly id: string
  readonly accountId: string
  readonly stripeId: string
  readonly customerId: string
  readonly url: string
  readonly product: {
    readonly id: string
    readonly type: string
    readonly priceId: string
    readonly renovationInterval?: Nullable<number>
    readonly renovationType?: Nullable<string>
  }

  readonly price: string
  readonly completed: boolean
  readonly successUrl: string
  readonly failUrl: string

  static {
    DomainEvent.derived.add(StripeSessionVerifiedDomainEvent.EVENT_NAME)
  }

  constructor (params: StripeSessionVerifiedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(StripeSessionVerifiedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.accountId = params.accountId
    this.stripeId = params.stripeId
    this.url = params.url
    this.customerId = params.customerId
    this.product = params.product
    this.price = params.price
    this.completed = params.completed
    this.successUrl = params.successUrl
    this.failUrl = params.failUrl
  }

  static fromAggregate (stripeSession: StripeSession): StripeSessionVerifiedDomainEvent {
    return new StripeSessionVerifiedDomainEvent({
      id: stripeSession.id.valueOf(),
      accountId: stripeSession.accountId.valueOf(),
      stripeId: stripeSession.stripeId.valueOf(),
      url: stripeSession.url.valueOf(),
      customerId: stripeSession.customerId.valueOf(),
      product: stripeSession.product.toPrimitives(),
      price: stripeSession.price.valueOf(),
      completed: stripeSession.completed.valueOf(),
      successUrl: stripeSession.successUrl.valueOf(),
      failUrl: stripeSession.failUrl.valueOf()
    })
  }

  toPrimitive (): StripeSessionVerifiedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: StripeSessionVerifiedDomainEventBody, eventId: string, occurredOn: Date): StripeSessionVerifiedDomainEvent {
    return new StripeSessionVerifiedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
