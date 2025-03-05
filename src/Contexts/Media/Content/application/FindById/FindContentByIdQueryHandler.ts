import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindContentByIdQuery } from './FindContentByIdQuery'
import { ContentResponse } from '../ContentResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Media/Content/domain/ValueObjects/Id'

export class FindContentByIdQueryHandler implements QueryHandler<FindContentByIdQuery, ContentResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindContentByIdQuery
  }

  async handle (data: FindContentByIdQuery): Promise<ContentResponse> {
    return new ContentResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
