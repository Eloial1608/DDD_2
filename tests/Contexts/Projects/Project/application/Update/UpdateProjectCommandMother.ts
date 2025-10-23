import { UpdateProjectCommand } from '@Projects/Project/application/Update/UpdateProjectCommand'
import { Project } from '@Projects/Project/domain/Project'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateProjectCommandMother {
  static update (
    id: string,
    communityId: string,
    userId: string,
    spaceId: string,
    title: string,
    description: Nullable<string>,
    bannerUrl: Nullable<string>,
    leadUserId: string,
    startDate: Nullable<Date>,
    endDate: Nullable<Date>
  ): UpdateProjectCommand {
    return new UpdateProjectCommand(
      id,
      communityId,
      userId,
      spaceId,
      title,
      description,
      bannerUrl,
      leadUserId,
      startDate,
      endDate
    )
  }

  static fromAggregate (project: Project): UpdateProjectCommand {
    return this.update(
      project.id.valueOf(),
      project.communityId.valueOf(),
      project.userId.valueOf(),
      project.spaceId.valueOf(),
      project.title.valueOf(),
      project.description?.valueOf(),
      project.bannerUrl?.valueOf(),
      project.leadUserId.valueOf(),
      project.startDate?.valueOf(),
      project.endDate?.valueOf()
    )
  }
}
