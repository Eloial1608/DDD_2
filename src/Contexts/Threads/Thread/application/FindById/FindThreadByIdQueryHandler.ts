import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindThreadByIdQuery } from './FindThreadByIdQuery'
import { ThreadResponse } from '../ThreadResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'

export class FindThreadByIdQueryHandler implements QueryHandler<FindThreadByIdQuery, ThreadResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindThreadByIdQuery
  }

  async handle (data: FindThreadByIdQuery): Promise<ThreadResponse> {
    return new ThreadResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
