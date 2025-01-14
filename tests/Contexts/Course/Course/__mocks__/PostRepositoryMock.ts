import { Course } from '@Course/Course/domain/Course'
import { CourseRepository } from '@Course/Course/domain/CourseRepository'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class CourseRepositoryMock implements CourseRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<Course>
  private expectedSearch: Array<Course> = []

  async find (id: Id): Promise<Nullable<Course>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (course: Nullable<Course>): void {
    this.expectedFind = course
  }

  returnOnSearch (course: Array<Course>): void {
    this.expectedSearch = course
  }

  async search (criteria: Criteria): Promise<Array<Course>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (course: Course): Promise<void> {
    this.mockPersist(course)
  }

  assertPersistHasBeenCalledWith (course: Course) {
    expect(this.mockPersist).toHaveBeenCalledWith(course)
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
