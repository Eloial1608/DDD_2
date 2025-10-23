import { ProjectUser } from '../domain/ProjectUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { ProjectUserResponse, ProjectUserResponseBody } from './ProjectUserResponse'

export class ProjectUserCollectionResponse implements QueryResponse<Array<ProjectUserResponseBody>> {
  response: Array<ProjectUserResponseBody>

  constructor (projectUser: Array<ProjectUser>) {
    this.response = projectUser.map(x => new ProjectUserResponse(x).response)
  }
}
