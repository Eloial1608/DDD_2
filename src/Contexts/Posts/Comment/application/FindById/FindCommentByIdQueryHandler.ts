import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindCommentByIdQuery } from './FindCommentByIdQuery'
import { CommentResponse } from '../CommentResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Posts/Comment/domain/ValueObjects/Id'

export class FindCommentByIdQueryHandler implements QueryHandler<FindCommentByIdQuery, CommentResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindCommentByIdQuery
  }

  async handle (data: FindCommentByIdQuery): Promise<CommentResponse> {
    return new CommentResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
