import { ProductRepository } from '@Marketplace/Products/domain/ProductRepository'
import { Product } from '@Marketplace/Products/domain/Product'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: ProductRepository) {}

  async find (criteria: Criteria): Promise<Array<Product>> {
    return await this.repository.search(criteria)
  }
}
