import { ProductMediaType } from './ProductMediaType'

export class ProductMedia {
  constructor (
        readonly id: string,
        readonly mediaUrl: string,
        readonly mediaType: ProductMediaType
  ) {}

  toPrimitives () {
    return {
      id: this.id,
      mediaUrl: this.mediaUrl,
      mediaType: this.mediaType
    }
  }
}
