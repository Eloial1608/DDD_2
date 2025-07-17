import { ProjectRepository } from '@Projects/Project/domain/ProjectRepository'
import { Project } from '@Projects/Project/domain/Project'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: ProjectRepository) {}

  async find (criteria: Criteria): Promise<Array<Project>> {
    return await this.repository.search(criteria)
  }
}
