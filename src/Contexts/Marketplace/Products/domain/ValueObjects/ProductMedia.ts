import { ProductMediaType, ProductMediaTypes } from './ProductMediaType'

export type ProductMediaPrimitive = {
  id: string,
  mediaUrl: string,
  mediaType: ProductMediaTypes
}
export class ProductMedia {
  constructor (
        readonly id: string,
        readonly mediaUrl: string,
        readonly mediaType: ProductMediaType
  ) {}

  toPrimitives (): ProductMediaPrimitive {
    return {
      id: this.id,
      mediaUrl: this.mediaUrl,
      mediaType: this.mediaType.valueOf()
    }
  }

  static fromPrimitives (
    id: string,
    mediaUrl: string,
    mediaType: ProductMediaTypes
  ): ProductMedia {
    return new ProductMedia(
      id,
      mediaUrl,
      new ProductMediaType(mediaType)
    )
  }
}
