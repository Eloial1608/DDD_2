import { Product } from '@Marketplace/Products/domain/Product'
import { ProductRepository } from '@Marketplace/Products/domain/ProductRepository'
import { Id } from '@Marketplace/Products/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class ProductRepositoryMock implements ProductRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<Product>
  private expectedSearch: Array<Product> = []

  async find (id: Id): Promise<Nullable<Product>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (Product: Nullable<Product>): void {
    this.expectedFind = Product
  }

  returnOnSearch (Product: Array<Product>): void {
    this.expectedSearch = Product
  }

  async search (criteria: Criteria): Promise<Array<Product>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (Product: Product): Promise<void> {
    this.mockPersist(Product)
  }

  assertPersistHasBeenCalledWith (Product: Product) {
    expect(this.mockPersist).toHaveBeenCalledWith(Product)
  }

  assertPersistHasNotBeenCalled () {
    expect(this.mockPersist).not.toHaveBeenCalled()
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
