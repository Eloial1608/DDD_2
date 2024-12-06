import { User } from '@Core/User/domain/User'
import { UserRepository } from '@Core/User/domain/UserRepository'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class UserRepositoryMock implements UserRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<User>
  private expectedSearch: Array<User> = []

  async find (id: Id): Promise<Nullable<User>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (user: Nullable<User>): void {
    this.expectedFind = user
  }

  returnOnSearch (user: Array<User>): void {
    this.expectedSearch = user
  }

  async search (criteria: Criteria): Promise<Array<User>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (user: User): Promise<void> {
    this.mockPersist(user)
  }

  assertPersistHasBeenCalledWith (user: User) {
    expect(this.mockPersist).toHaveBeenCalledWith(user)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
