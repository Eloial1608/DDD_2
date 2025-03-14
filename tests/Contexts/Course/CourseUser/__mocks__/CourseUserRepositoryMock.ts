import { CourseUser } from '@Course/CourseUser/domain/CourseUser'
import { CourseUserRepository } from '@Course/CourseUser/domain/CourseUserRepository'
import { Id } from '@Course/CourseUser/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class CourseUserRepositoryMock implements CourseUserRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<CourseUser>
  private expectedSearch: Array<CourseUser> = []

  async find (id: Id): Promise<Nullable<CourseUser>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (courseUser: Nullable<CourseUser>): void {
    this.expectedFind = courseUser
  }

  returnOnSearch (courseUser: Array<CourseUser>): void {
    this.expectedSearch = courseUser
  }

  async search (criteria: Criteria): Promise<Array<CourseUser>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (courseUser: CourseUser): Promise<void> {
    this.mockPersist(courseUser)
  }

  assertPersistHasBeenCalledWith (courseUser: CourseUser) {
    expect(this.mockPersist).toHaveBeenCalledWith(courseUser)
  }

  async delete (courseUser: CourseUser): Promise<void> {
    this.mockDelete(courseUser)
  }

  assertDeleteHasBeenCalledWith (courseUser: CourseUser) {
    expect(this.mockDelete).toHaveBeenCalledWith(courseUser)
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
