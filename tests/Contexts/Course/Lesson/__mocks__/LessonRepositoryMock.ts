import { Lesson } from '@Course/Lesson/domain/Lesson'
import { LessonRepository } from '@Course/Lesson/domain/LessonRepository'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class LessonRepositoryMock implements LessonRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<Lesson>
  private expectedSearch: Array<Lesson> = []

  async find (id: Id): Promise<Nullable<Lesson>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (lesson: Nullable<Lesson>): void {
    this.expectedFind = lesson
  }

  returnOnSearch (lesson: Array<Lesson>): void {
    this.expectedSearch = lesson
  }

  async search (criteria: Criteria): Promise<Array<Lesson>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (lesson: Lesson): Promise<void> {
    this.mockPersist(lesson)
  }

  assertPersistHasBeenCalledWith (lesson: Lesson) {
    expect(this.mockPersist).toHaveBeenCalledWith(lesson)
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
