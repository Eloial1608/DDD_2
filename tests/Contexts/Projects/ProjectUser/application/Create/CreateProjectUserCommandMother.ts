import { CreateProjectUserCommand } from '@Projects/ProjectUser/application/Create/CreateProjectCommand'
import { ProjectUser } from '@Projects/ProjectUser/domain/ProjectUser'

export class CreateProjectUserCommandMother {
  static create (
    id: string,
    userId: string,
    projectId: string
  ): CreateProjectUserCommand {
    return new CreateProjectUserCommand(
      id,
      userId,
      projectId
    )
  }

  static fromAggregate (projectUser: ProjectUser): CreateProjectUserCommand {
    return this.create(
      projectUser.id.valueOf(),
      projectUser.userId.valueOf(),
      projectUser.projectId.valueOf()
    )
  }
}
