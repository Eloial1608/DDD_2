import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindUserTitleByIdQuery } from './FindUserTitleByIdQuery'
import { UserTitleResponse } from '../UserTitleResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/UserTitle/domain/ValueObjects/Id'

export class FindUserTitleByIdQueryHandler implements QueryHandler<FindUserTitleByIdQuery, UserTitleResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindUserTitleByIdQuery
  }

  async handle (data: FindUserTitleByIdQuery): Promise<UserTitleResponse> {
    return new UserTitleResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
