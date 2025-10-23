import { ProductRepository } from '@Marketplace/Products/domain/ProductRepository'
import { Id } from '@Marketplace/Products/domain/ValueObjects/Id'
import { Product } from '@Marketplace/Products/domain/Product'
import { ProductNotFound } from '@Marketplace/Products/domain/Errors/ProductNotFound'

export class FinderById {
  constructor (private readonly repository: ProductRepository) {}

  async find (id: Id): Promise<Product> {
    const product = await this.repository.find(id)

    if (!product) throw new ProductNotFound(id)

    return product
  }
}
