import { DeleteProjectCommand } from '@Projects/Project/application/Delete/DeleteProjectCommand'
import { Project } from '@Projects/Project/domain/Project'

export class DeleteProjectCommandMother {
  static delete (id: string, communityId: string, userId: string): DeleteProjectCommand {
    return new DeleteProjectCommand(id, communityId, userId)
  }

  static fromAggregate (project: Project): DeleteProjectCommand {
    return this.delete(
      project.id.valueOf(),
      project.communityId.valueOf(),
      project.userId.valueOf()
    )
  }
}
