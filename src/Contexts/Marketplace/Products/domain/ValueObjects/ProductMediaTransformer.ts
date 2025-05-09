import { ProductMedia } from './ProductMedia'
import { ProductMediaType, ProductMediaTypes } from './ProductMediaType'

export const ProductMediaTransformer = {
  to: (value: ProductMedia[]): string =>
    JSON.stringify(value.map((productMedia) => productMedia.toPrimitives())),

  from: (value: string): ProductMedia[] => {
    const parsedProductmedia = JSON.parse(value) as Array<{
      id: string,
      mediaUrl: string,
      mediaType: ProductMediaTypes
    }>

    return parsedProductmedia.map(productMedia =>
      new ProductMedia(
        productMedia.id,
        productMedia.mediaUrl,
        new ProductMediaType(productMedia.mediaType)
      )
    )
  }
}
