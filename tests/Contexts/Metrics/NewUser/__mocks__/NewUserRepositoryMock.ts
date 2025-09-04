import { NewUser } from '@Metrics/NewUser/domain/NewUser'
import { NewUserRepository } from '@Metrics/NewUser/domain/NewUserRepository'
import { Id } from '@Metrics/NewUser/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class NewUserRepositoryMock implements NewUserRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<NewUser>
  private expectedSearch: Array<NewUser> = []

  async find (id: Id): Promise<Nullable<NewUser>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (newuser: Nullable<NewUser>): void {
    this.expectedFind = newuser
  }

  returnOnSearch (newuser: Array<NewUser>): void {
    this.expectedSearch = newuser
  }

  async search (criteria: Criteria): Promise<Array<NewUser>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (newuser: NewUser): Promise<void> {
    this.mockPersist(newuser)
  }

  assertPersistHasBeenCalledWith (newuser: NewUser) {
    expect(this.mockPersist).toHaveBeenCalledWith(newuser)
  }

  assertDeleteHasBeenCalledWith (newuser: NewUser) {
    expect(this.mockDelete).toHaveBeenCalledWith(newuser)
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
