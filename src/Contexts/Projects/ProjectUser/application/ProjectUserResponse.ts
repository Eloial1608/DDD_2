import { ProjectUser } from '../domain/ProjectUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type ProjectUserResponseBody = {
    readonly id: string
    readonly userId: string
    readonly projectId: string
    readonly createdAt: Date
}

export class ProjectUserResponse implements QueryResponse<ProjectUserResponseBody> {
  response: ProjectUserResponseBody

  constructor (projectUser: ProjectUser) {
    this.response = {
      id: projectUser.id.valueOf(),
      userId: projectUser.userId.valueOf(),
      projectId: projectUser.projectId.valueOf(),
      createdAt: projectUser.createdAt.valueOf()
    }
  }
}
