import { Project } from '@Projects/Project/domain/Project'
import { ProjectRepository } from '@Projects/Project/domain/ProjectRepository'
import { Id } from '@Projects/Project/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class ProjectRepositoryMock implements ProjectRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Project>
  private expectedSearch: Array<Project> = []

  async find (id: Id): Promise<Nullable<Project>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (project: Nullable<Project>): void {
    this.expectedFind = project
  }

  returnOnSearch (project: Array<Project>): void {
    this.expectedSearch = project
  }

  async search (criteria: Criteria): Promise<Array<Project>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (project: Project): Promise<void> {
    this.mockPersist(project)
  }

  async delete (project: Project): Promise<void> {
    this.mockDelete(project)
  }

  assertPersistHasBeenCalledWith (project: Project) {
    expect(this.mockPersist).toHaveBeenCalledWith(project)
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
