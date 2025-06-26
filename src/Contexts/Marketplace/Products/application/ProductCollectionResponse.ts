import { Product } from '../domain/Product'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { ProductResponse, ProductResponseBody } from './ProductResponse'

export class ProductCollectionResponse implements QueryResponse<Array<ProductResponseBody>> {
  response: Array<ProductResponseBody>

  constructor (product: Array<Product>) {
    this.response = product.map(x => new ProductResponse(x).response)
  }
}
