import { User } from '@Marketplace/User/domain/User'
import { UserRepository } from '@Marketplace/User/domain/UserRepository'
import { Id } from '@Marketplace/User/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class UserRepositoryMock implements UserRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

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

  async delete (user: User): Promise<void> {
    this.mockDelete(user)
  }

  assertDeleteHasBeenCalledWith (user: User) {
    expect(this.mockDelete).toHaveBeenCalledWith(user)
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
