import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { StripeProduct } from '../StripeProduct'
import { Nullable } from '@Shared/domain/Nullable'

type StripeProductUpdatedDomainEventBody = {
    readonly id: string
    readonly name: string
    readonly price: string
    readonly priceId: string
    readonly productType: string
    readonly renovationType: Nullable<string>
    readonly renovationInterval: Nullable<number>
}

export class StripeProductUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.stripe-product.v1.updated'

  readonly id: string
  readonly name: string
  readonly price: string
  readonly priceId: string
  readonly productType: string
  readonly renovationType: Nullable<string>
  readonly renovationInterval: Nullable<number>

  static {
    DomainEvent.derived.add(StripeProductUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: StripeProductUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(StripeProductUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)
    this.id = params.id
    this.name = params.name
    this.price = params.price
    this.priceId = params.priceId
    this.productType = params.productType
    this.renovationType = params.renovationType
    this.renovationInterval = params.renovationInterval
  }

  static fromAggregate (stripeProduct: StripeProduct): StripeProductUpdatedDomainEvent {
    return new StripeProductUpdatedDomainEvent({
      id: stripeProduct.id.valueOf(),
      name: stripeProduct.name.valueOf(),
      price: stripeProduct.price.valueOf(),
      productType: stripeProduct.productType.valueOf(),
      priceId: stripeProduct.priceId.valueOf(),
      renovationInterval: stripeProduct.renovationInterval?.valueOf(),
      renovationType: stripeProduct.renovationType?.valueOf()
    })
  }

  toPrimitive (): StripeProductUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: StripeProductUpdatedDomainEventBody, eventId: string, occurredOn: Date): StripeProductUpdatedDomainEvent {
    return new StripeProductUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
