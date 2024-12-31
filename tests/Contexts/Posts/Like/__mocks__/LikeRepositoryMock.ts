import { Like } from '@Posts/Like/domain/Like'
import { LikeRepository } from '@Posts/Like/domain/LikeRepository'
import { Id } from '@Posts/Like/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class LikeRepositoryMock implements LikeRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<Like>
  private expectedSearch: Array<Like> = []

  async find (id: Id): Promise<Nullable<Like>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (like: Nullable<Like>): void {
    this.expectedFind = like
  }

  returnOnSearch (like: Array<Like>): void {
    this.expectedSearch = like
  }

  async search (criteria: Criteria): Promise<Array<Like>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (like: Like): Promise<void> {
    this.mockPersist(like)
  }

  assertPersistHasBeenCalledWith (like: Like) {
    expect(this.mockPersist).toHaveBeenCalledWith(like)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
