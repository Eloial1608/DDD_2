import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindStatusByIdQuery } from './FindStatusByIdQuery'
import { StatusResponse } from '../StatusResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Projects/Status/domain/ValueObjects/Id'

export class FindStatusByIdQueryHandler implements QueryHandler<FindStatusByIdQuery, StatusResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindStatusByIdQuery
  }

  async handle (data: FindStatusByIdQuery): Promise<StatusResponse> {
    return new StatusResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
