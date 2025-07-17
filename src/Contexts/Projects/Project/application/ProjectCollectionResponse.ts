import { Project } from '../domain/Project'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { ProjectResponse, ProjectResponseBody } from './ProjectResponse'

export class ProjectCollectionResponse implements QueryResponse<Array<ProjectResponseBody>> {
  response: Array<ProjectResponseBody>

  constructor (project: Array<Project>) {
    this.response = project.map(x => new ProjectResponse(x).response)
  }
}
