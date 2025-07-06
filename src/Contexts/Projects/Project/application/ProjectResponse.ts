import { Nullable } from "@Shared/domain/Nullable";
import { QueryResponse } from "@Shared/domain/QueryBus/QueryResponse";
import { Project } from "../domain/Project";

export type ProjectResponseBody = {
  readonly id: string,  
  readonly title: string,
  readonly description: Nullable<string>,
  readonly bannerUrl: Nullable<string>,
  readonly leadUserId: string,
  readonly startDate: Nullable<Date>,
  readonly endDate: Nullable<Date>,
  readonly totalTasks: number,
  readonly communityId: string,
  readonly spaceId: string,
  readonly userId: string,
  readonly createdAt: Date,
  readonly updatedAt: Date,
  readonly deletedAt: Nullable<Date>
}

export class ProjectResponse implements QueryResponse<ProjectResponseBody> {
  response: ProjectResponseBody;

  constructor(project: Project) {
    this.response = {
      id: project.id.valueOf(),
      title: project.title.valueOf(),
      description: project.description?.valueOf(),
      bannerUrl: project.bannerUrl?.valueOf(),
      leadUserId: project.leadUserId.valueOf(),
      startDate: project.startDate?.valueOf(),
      endDate: project.endDate?.valueOf(),
      totalTasks: project.totalTasks.valueOf(),
      communityId: project.communityId.valueOf(),
      spaceId: project.spaceId.valueOf(),
      userId: project.userId.valueOf(),
      createdAt: project.createdAt.valueOf(),
      updatedAt: project.updatedAt.valueOf(),
      deletedAt: project.deletedAt?.valueOf()
    };
  }
}
