import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindPostByIdQuery } from './FindPostByIdQuery'
import { PostResponse } from '../PostResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'

export class FindPostByIdQueryHandler implements QueryHandler<FindPostByIdQuery, PostResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindPostByIdQuery
  }

  async handle (data: FindPostByIdQuery): Promise<PostResponse> {
    return new PostResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
