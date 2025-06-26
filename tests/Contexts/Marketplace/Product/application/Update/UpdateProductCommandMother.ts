import { Nullable } from '@Shared/domain/Nullable'
import { UpdateProductCommand } from '@Marketplace/Products/application/Update/UpdateProductCommand'
import { Product } from '@Marketplace/Products/domain/Product'
import { ProductMediaPrimitive } from '@Marketplace/Products/domain/ValueObjects/ProductMedia'

export class UpdateProductCommandMother {
  static update (
    id: string,
    title: string,
    content: string,
    bannerUrl: Nullable<string>,
    productMedia: ProductMediaPrimitive[],
    stock: Nullable<number>,
    price: {
        value: number,
        currency: string
    }

  ): UpdateProductCommand {
    return new UpdateProductCommand(
      id,
      title,
      content,
      bannerUrl,
      productMedia,
      stock,
      price
    )
  }

  static fromAggregate (product: Product): UpdateProductCommand {
    return this.update(
      product.id.valueOf(),
      product.title.valueOf(),
      product.content.valueOf(),
      product.bannerUrl?.valueOf(),
      product.productMedia.map(x => x.toPrimitives()),
      product.stock?.valueOf(),
      {
        value: product.price.value.valueOf(),
        currency: product.price.currency.valueOf()
      }

    )
  }
}
