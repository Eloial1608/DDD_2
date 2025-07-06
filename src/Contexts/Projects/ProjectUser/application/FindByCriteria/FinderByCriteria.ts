import { ProjectUser } from '@Projects/ProjectUser/domain/ProjectUser'
import { ProjectUserRepository } from '@Projects/ProjectUser/domain/ProjectUserRepository'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: ProjectUserRepository) {}

  async find (criteria: Criteria): Promise<Array<ProjectUser>> {
    return await this.repository.search(criteria)
  }
}
