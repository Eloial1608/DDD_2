import { Nullable } from '@Shared/domain/Nullable'
import { CreateProductCommand } from '@Marketplace/Products/application/Create/CreateProductCommand'
import { Product } from '@Marketplace/Products/domain/Product'
import { ProductMediaPrimitive } from '@Marketplace/Products/domain/ValueObjects/ProductMedia'
import { ProductTypes } from '@Marketplace/Products/domain/ValueObjects/Type'

export class CreateProductCommandMother {
  static create (
    id: string,
    communityId: string,
    spaceId: string,
    title: string,
    userId: string,
    content: string,
    bannerUrl: Nullable<string>,
    productMedia: ProductMediaPrimitive[],
    type: ProductTypes,
    stock: Nullable<number>,
    price: {
        value: number,
        currency: string
    }

  ): CreateProductCommand {
    return new CreateProductCommand(
      id,
      communityId,
      spaceId,
      title,
      userId,
      content,
      bannerUrl,
      productMedia,
      type,
      stock,
      price
    )
  }

  static fromAggregate (product: Product): CreateProductCommand {
    return this.create(
      product.id.valueOf(),
      product.communityId.valueOf(),
      product.spaceId.valueOf(),
      product.title.valueOf(),
      product.userId.valueOf(),
      product.content.valueOf(),
      product.bannerUrl?.valueOf(),
      product.productMedia.map(x => x.toPrimitives()),
      product.type.valueOf(),
      product.stock?.valueOf(),
      {
        value: product.price.value.valueOf(),
        currency: product.price.currency.valueOf()
      }

    )
  }
}
