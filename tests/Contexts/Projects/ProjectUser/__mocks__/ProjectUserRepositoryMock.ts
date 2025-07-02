import { ProjectUser } from '@Projects/ProjectUser/domain/ProjectUser'
import { ProjectUserRepository } from '@Projects/ProjectUser/domain/ProjectUserRepository'
import { Id } from '@Projects/ProjectUser/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class ProjectUserRepositoryMock implements ProjectUserRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<ProjectUser>
  private expectedSearch: Array<ProjectUser> = []

  async find (id: Id): Promise<Nullable<ProjectUser>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (projectUser: Nullable<ProjectUser>): void {
    this.expectedFind = projectUser
  }

  returnOnSearch (projectUser: Array<ProjectUser>): void {
    this.expectedSearch = projectUser
  }

  async search (criteria: Criteria): Promise<Array<ProjectUser>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (projectUser: ProjectUser): Promise<void> {
    this.mockPersist(projectUser)
  }

  assertPersistHasBeenCalledWith (projectUser: ProjectUser) {
    expect(this.mockPersist).toHaveBeenCalledWith(projectUser)
  }

  async delete (projectUser: ProjectUser): Promise<void> {
    this.mockDelete(projectUser)
  }

  assertDeleteHasBeenCalledWith (projectUser: ProjectUser) {
    expect(this.mockDelete).toHaveBeenCalledWith(projectUser)
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
