import { Thread } from '@Threads/Thread/domain/Thread'
import { ThreadRepository } from '@Threads/Thread/domain/ThreadRepository'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class ThreadRepositoryMock implements ThreadRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<Thread>
  private expectedSearch: Array<Thread> = []

  async find (id: Id): Promise<Nullable<Thread>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (thread: Nullable<Thread>): void {
    this.expectedFind = thread
  }

  returnOnSearch (thread: Array<Thread>): void {
    this.expectedSearch = thread
  }

  async search (criteria: Criteria): Promise<Array<Thread>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (thread: Thread): Promise<void> {
    this.mockPersist(thread)
  }

  assertPersistHasBeenCalledWith (thread: Thread) {
    expect(this.mockPersist).toHaveBeenCalledWith(thread)
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
