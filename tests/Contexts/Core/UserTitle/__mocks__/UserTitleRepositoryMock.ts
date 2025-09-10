import { UserTitle } from '@Core/UserTitle/domain/UserTitle'
import { UserTitleRepository } from '@Core/UserTitle/domain/UserTitleRepository'
import { Id } from '@Core/UserTitle/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class UserTitleRepositoryMock implements UserTitleRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<UserTitle>
  private expectedSearch: Array<UserTitle> = []

  async find (id: Id): Promise<Nullable<UserTitle>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (space: Nullable<UserTitle>): void {
    this.expectedFind = space
  }

  returnOnSearch (space: Array<UserTitle>): void {
    this.expectedSearch = space
  }

  async search (criteria: Criteria): Promise<Array<UserTitle>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (space: UserTitle): Promise<void> {
    this.mockPersist(space)
  }

  async delete (space: UserTitle): Promise<void> {
    this.mockDelete(space)
  }

  assertPersistHasBeenCalledWith (space: UserTitle) {
    expect(this.mockPersist).toHaveBeenCalledWith(space)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
