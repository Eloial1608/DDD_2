import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Product } from '../Product'
import { Nullable } from '@Shared/domain/Nullable'
import { ProductMediaPrimitive } from '../ValueObjects/ProductMedia'
import { ProductTypes } from '../ValueObjects/Type'

type ProductDeletedDomainEventBody = {
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

export class ProductDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.marketplace.product.v1.deleted'

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
    DomainEvent.derived.add(ProductDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: ProductDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ProductDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

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

  static fromAggregate (product: Product): ProductDeletedDomainEvent {
    return new ProductDeletedDomainEvent({
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

  toPrimitive (): ProductDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ProductDeletedDomainEventBody, eventId: string, occurredOn: Date): ProductDeletedDomainEvent {
    return new ProductDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
