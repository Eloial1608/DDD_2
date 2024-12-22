import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { StripeSession } from '../StripeSession'
import { Nullable } from '@Shared/domain/Nullable'

type StripeSessionCreatedDomainEventBody = {
  readonly id: string
  readonly accountId: string
  readonly stripeId: string
  readonly url: string
  readonly product: {
    readonly id: string
    readonly type: string
    readonly priceId: string
    readonly name: string
    readonly renovationInterval?: Nullable<number>
    readonly renovationType?: Nullable<string>
  }
  readonly price: string
  readonly completed: boolean
  readonly successUrl: string
  readonly failUrl: string

}

export class StripeSessionCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.stripe-session.v1.created'

  readonly id: string
  readonly accountId: string
  readonly stripeId: string
  readonly url: string
  readonly product: {
    readonly id: string
    readonly type: string
    readonly priceId: string
    readonly name: string
    readonly renovationInterval?: Nullable<number>
    readonly renovationType?: Nullable<string>
  }

  readonly price: string
  readonly completed: boolean
  readonly successUrl: string
  readonly failUrl: string

  static {
    DomainEvent.derived.add(StripeSessionCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: StripeSessionCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(StripeSessionCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.accountId = params.accountId
    this.stripeId = params.stripeId
    this.url = params.url
    this.product = params.product
    this.price = params.price
    this.completed = params.completed
    this.successUrl = params.successUrl
    this.failUrl = params.failUrl
  }

  static fromAggregate (stripeSession: StripeSession): StripeSessionCreatedDomainEvent {
    return new StripeSessionCreatedDomainEvent({
      id: stripeSession.id.valueOf(),
      accountId: stripeSession.accountId.valueOf(),
      stripeId: stripeSession.stripeId.valueOf(),
      url: stripeSession.url.valueOf(),
      product: stripeSession.product.toPrimitives(),
      price: stripeSession.price.valueOf(),
      completed: stripeSession.completed.valueOf(),
      successUrl: stripeSession.successUrl.valueOf(),
      failUrl: stripeSession.failUrl.valueOf()
    })
  }

  toPrimitive (): StripeSessionCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: StripeSessionCreatedDomainEventBody, eventId: string, occurredOn: Date): StripeSessionCreatedDomainEvent {
    return new StripeSessionCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
