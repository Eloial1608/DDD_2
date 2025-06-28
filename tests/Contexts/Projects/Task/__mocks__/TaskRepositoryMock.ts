import { Task } from '@Projects/Task/domain/Task'
import { TaskRepository } from '@Projects/Task/domain/TaskRepository'
import { Id } from '@Projects/Task/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class TaskRepositoryMock implements TaskRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Task>
  private expectedSearch: Array<Task> = []

  async find(id: Id): Promise<Nullable<Task>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind(Task: Nullable<Task>): void {
    this.expectedFind = Task
  }

  returnOnSearch(Task: Array<Task>): void {
    this.expectedSearch = Task
  }

  async search(criteria: Criteria): Promise<Array<Task>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist(Task: Task): Promise<void> {
    this.mockPersist(Task)
  }

  async delete(Task: Task): Promise<void> {
    this.mockDelete(Task)
  }

  assertPersistHasBeenCalledWith(Task: Task) {
    expect(this.mockPersist).toHaveBeenCalledWith(Task)
  }

  assertPersistHasNotBeenCalled() {
    expect(this.mockPersist).not.toHaveBeenCalled()
  }

  assertFindHasBeenCalledWith(id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith(criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
