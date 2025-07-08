import type { DigitalStock } from '@Marketplace/DigitalStock/domain/DigitalStock'
import type { DigitalStockRepository } from '@Marketplace/DigitalStock/domain/DigitalStockRepository'
import type { Id } from '@Marketplace/DigitalStock/domain/ValueObjects/Id'
import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import type { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class DigitalStockRepositoryMock implements DigitalStockRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<DigitalStock>
  private expectedSearch: Array<DigitalStock> = []

  async find (id: Id): Promise<Nullable<DigitalStock>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (stock: Nullable<DigitalStock>): void {
    this.expectedFind = stock
  }

  returnOnSearch (stocks: Array<DigitalStock>): void {
    this.expectedSearch = stocks
  }

  async search (criteria: Criteria): Promise<Array<DigitalStock>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (stock: DigitalStock): Promise<void> {
    this.mockPersist(stock)
  }

  async delete (stock: DigitalStock): Promise<void> {
    this.mockDelete(stock)
  }

  assertPersistHasBeenCalledWith (stock: DigitalStock) {
    expect(this.mockPersist).toHaveBeenCalledWith(stock)
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

  assertDeleteHasBeenCalledWith (stock: DigitalStock) {
    expect(this.mockDelete).toHaveBeenCalledWith(stock)
  }

  assertDeleteHasNotBeenCalled () {
    expect(this.mockDelete).not.toHaveBeenCalled()
  }
}
