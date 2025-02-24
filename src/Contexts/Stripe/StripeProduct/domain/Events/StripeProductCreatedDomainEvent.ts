import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { StripeProduct } from '../StripeProduct'
import { Nullable } from '@Shared/domain/Nullable'

type StripeProductCreatedDomainEventBody = {
    readonly id: string
    readonly name: string
    readonly price: string
    readonly priceId: string
    readonly productType: string
    readonly renovationType: Nullable<string>
    readonly renovationInterval: Nullable<number>
}

export class StripeProductCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.stripe-product.v1.created'

  readonly id: string
  readonly name: string
  readonly price: string
  readonly priceId: string
  readonly productType: string
  readonly renovationType: Nullable<string>
  readonly renovationInterval: Nullable<number>

  static {
    DomainEvent.derived.add(StripeProductCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: StripeProductCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(StripeProductCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)
    this.id = params.id
    this.name = params.name
    this.price = params.price
    this.priceId = params.priceId
    this.productType = params.productType
    this.renovationType = params.renovationType
    this.renovationInterval = params.renovationInterval
  }

  static fromAggregate (stripeProduct: StripeProduct): StripeProductCreatedDomainEvent {
    return new StripeProductCreatedDomainEvent({
      id: stripeProduct.id.valueOf(),
      name: stripeProduct.name.valueOf(),
      price: stripeProduct.price.valueOf(),
      productType: stripeProduct.productType.valueOf(),
      priceId: stripeProduct.priceId.valueOf(),
      renovationInterval: stripeProduct.renovationInterval?.valueOf(),
      renovationType: stripeProduct.renovationType?.valueOf()
    })
  }

  toPrimitive (): StripeProductCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: StripeProductCreatedDomainEventBody, eventId: string, occurredOn: Date): StripeProductCreatedDomainEvent {
    return new StripeProductCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
