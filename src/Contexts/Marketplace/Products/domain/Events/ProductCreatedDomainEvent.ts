import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Product } from '../Product'
import { Nullable } from '@Shared/domain/Nullable'
import { ProductMediaPrimitive } from '../ValueObjects/ProductMedia'
import { ProductTypes } from '../ValueObjects/Type'

type ProductCreatedDomainEventBody = {
    readonly id: string,
    readonly communityId: string,
    readonly spaceId: string,
    readonly title: string,
    readonly userId: string,
    readonly content: string,
    readonly bannerUrl: Nullable<string>,
    readonly productMedia: ProductMediaPrimitive[],
    readonly type: ProductTypes,
    readonly stock: Nullable<number>,
    readonly price: Nullable<{
        value: number,
        currency: string
    }>
}

export class ProductCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.marketplace.product.v1.created'

  readonly id: string
  readonly communityId: string
  readonly spaceId: string
  readonly title: string
  readonly userId: string
  readonly content: string
  readonly bannerUrl: Nullable<string>
  readonly productMedia: ProductMediaPrimitive[]
  readonly type: ProductTypes
  readonly stock: Nullable<number>
  readonly price: Nullable<{
      value: number
      currency: string
  }>

  static {
    DomainEvent.derived.add(ProductCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ProductCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ProductCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.spaceId = params.spaceId
    this.title = params.title
    this.stock = params.stock
    this.bannerUrl = params.bannerUrl
    this.userId = params.userId
    this.content = params.content
    this.productMedia = params.productMedia
    this.price = params.price
    this.type = params.type
    this.communityId = params.communityId
  }

  static fromAggregate (product: Product): ProductCreatedDomainEvent {
    return new ProductCreatedDomainEvent({
      id: product.id.valueOf(),
      communityId: product.communityId.valueOf(),
      spaceId: product.spaceId.valueOf(),
      title: product.title.valueOf(),
      userId: product.userId.valueOf(),
      content: product.content.valueOf(),
      productMedia: product.productMedia.map(x => x.toPrimitives()),
      price: {
        value: product.price.value.valueOf(),
        currency: product.price.currency.valueOf()
      },
      type: product.type.valueOf(),
      bannerUrl: product.bannerUrl?.valueOf(),
      stock: product.stock?.valueOf()
    })
  }

  toPrimitive (): ProductCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ProductCreatedDomainEventBody, eventId: string, occurredOn: Date): ProductCreatedDomainEvent {
    return new ProductCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
