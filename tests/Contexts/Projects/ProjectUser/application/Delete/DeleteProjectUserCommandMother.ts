import { DeleteProjectUserCommand } from '@Projects/ProjectUser/application/Delete/DeleteProjectUserCommand'
import { ProjectUser } from '@Projects/ProjectUser/domain/ProjectUser'

export class DeleteMediaCommandMother {
  static delete (id: string): DeleteProjectUserCommand {
    return new DeleteProjectUserCommand(id)
  }

  static fromAggregate (projectUser: ProjectUser): DeleteProjectUserCommand {
    return this.delete(
      projectUser.id.valueOf()
    )
  }
}
