import { UserLevel } from '@Core/UserLevel/domain/UserLevel'
import { UserLevelRepository } from '@Core/UserLevel/domain/UserLevelRepository'
import { Id } from '@Core/UserLevel/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class UserLevelRepositoryMock implements UserLevelRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<UserLevel>
  private expectedSearch: Array<UserLevel> = []

  async find (id: Id): Promise<Nullable<UserLevel>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (userLevel: Nullable<UserLevel>): void {
    this.expectedFind = userLevel
  }

  returnOnSearch (userLevel: Array<UserLevel>): void {
    this.expectedSearch = userLevel
  }

  async search (criteria: Criteria): Promise<Array<UserLevel>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (userLevel: UserLevel): Promise<void> {
    this.mockPersist(userLevel)
  }

  async delete (userLevel: UserLevel): Promise<void> {
    this.mockDelete(userLevel)
  }

  assertDeleteHasBeenCalledWith (userLevel: UserLevel) {
    expect(this.mockDelete).toHaveBeenCalledWith(userLevel)
  }

  assertPersistHasBeenCalledWith (userLevel: UserLevel) {
    expect(this.mockPersist).toHaveBeenCalledWith(userLevel)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
