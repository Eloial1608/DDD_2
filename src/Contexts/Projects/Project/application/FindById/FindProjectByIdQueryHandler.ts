import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindProjectByIdQuery } from './FindProjectByIdQuery'
import { ProjectResponse } from '../ProjectResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Projects/Project/domain/ValueObjects/Id'

export class FindProjectByIdQueryHandler implements QueryHandler<FindProjectByIdQuery, ProjectResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindProjectByIdQuery
  }

  async handle (data: FindProjectByIdQuery): Promise<ProjectResponse> {
    return new ProjectResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
