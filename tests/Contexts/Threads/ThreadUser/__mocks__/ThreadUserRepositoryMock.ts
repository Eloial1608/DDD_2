import { ThreadUser } from '@Threads/ThreadUser/domain/ThreadUser'
import { ThreadUserRepository } from '@Threads/ThreadUser/domain/ThreadUserRepository'
import { Id } from '@Threads/ThreadUser/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class ThreadUserRepositoryMock implements ThreadUserRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<ThreadUser>
  private expectedSearch: Array<ThreadUser> = []

  async find (id: Id): Promise<Nullable<ThreadUser>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (threadUser: Nullable<ThreadUser>): void {
    this.expectedFind = threadUser
  }

  returnOnSearch (threadUser: Array<ThreadUser>): void {
    this.expectedSearch = threadUser
  }

  async search (criteria: Criteria): Promise<Array<ThreadUser>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (threadUser: ThreadUser): Promise<void> {
    this.mockPersist(threadUser)
  }

  assertPersistHasBeenCalledWith (threadUser: ThreadUser) {
    expect(this.mockPersist).toHaveBeenCalledWith(threadUser)
  }

  async delete (threadUser: ThreadUser): Promise<void> {
    this.mockDelete(threadUser)
  }

  assertDeleteHasBeenCalledWith (threadUser: ThreadUser) {
    expect(this.mockDelete).toHaveBeenCalledWith(threadUser)
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
