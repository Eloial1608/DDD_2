import { ProjectRepository } from '@Projects/Project/domain/ProjectRepository'
import { Id } from '@Projects/Project/domain/ValueObjects/Id'
import { Project } from '@Projects/Project/domain/Project'
import { ProjectNotFound } from '@Projects/Project/domain/Errors/ProjectNotFound'

export class FinderById {
  constructor (private readonly repository: ProjectRepository) {}

  async find (id: Id): Promise<Project> {
    const project = await this.repository.find(id)

    if (!project) throw new ProjectNotFound(id)

    return project
  }
}
