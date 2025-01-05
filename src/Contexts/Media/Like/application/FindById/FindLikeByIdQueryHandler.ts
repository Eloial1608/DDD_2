import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindLikeByIdQuery } from './FindLikeByIdQuery'
import { LikeResponse } from '../LikeResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Media/Like/domain/ValueObjects/Id'

export class FindLikeByIdQueryHandler implements QueryHandler<FindLikeByIdQuery, LikeResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindLikeByIdQuery
  }

  async handle (data: FindLikeByIdQuery): Promise<LikeResponse> {
    return new LikeResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
