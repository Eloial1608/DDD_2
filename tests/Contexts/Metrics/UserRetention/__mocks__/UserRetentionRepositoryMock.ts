import { UserRetention } from '@Metrics/UserRetention/domain/UserRetention'
import { UserRetentionRepository } from '@Metrics/UserRetention/domain/UserRetentionRepository'
import { Id } from '@Metrics/UserRetention/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class UserRetentionRepositoryMock implements UserRetentionRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<UserRetention>
  private expectedSearch: Array<UserRetention> = []

  async find (id: Id): Promise<Nullable<UserRetention>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (userretention: Nullable<UserRetention>): void {
    this.expectedFind = userretention
  }

  returnOnSearch (userretention: Array<UserRetention>): void {
    this.expectedSearch = userretention
  }

  async search (criteria: Criteria): Promise<Array<UserRetention>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (userretention: UserRetention): Promise<void> {
    this.mockPersist(userretention)
  }

  assertPersistHasBeenCalledWith (userretention: UserRetention) {
    expect(this.mockPersist).toHaveBeenCalledWith(userretention)
  }

  assertDeleteHasBeenCalledWith (userretention: UserRetention) {
    expect(this.mockDelete).toHaveBeenCalledWith(userretention)
  }

  assertDeleteHasNotBeenCalled () {
    expect(this.mockDelete).not.toHaveBeenCalled()
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
