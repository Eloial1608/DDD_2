import { Review } from '@Marketplace/Reviews/domain/Review'
import { ReviewRepository } from '@Marketplace/Reviews/domain/ReviewRepository'
import { Id } from '@Marketplace/Reviews/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class ReviewRepositoryMock implements ReviewRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<Review>
  private expectedSearch: Array<Review> = []

  async find (id: Id): Promise<Nullable<Review>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (Review: Nullable<Review>): void {
    this.expectedFind = Review
  }

  returnOnSearch (Review: Array<Review>): void {
    this.expectedSearch = Review
  }

  async search (criteria: Criteria): Promise<Array<Review>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (Review: Review): Promise<void> {
    this.mockPersist(Review)
  }

  assertPersistHasBeenCalledWith (Review: Review) {
    expect(this.mockPersist).toHaveBeenCalledWith(Review)
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
