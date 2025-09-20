import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindUserLevelByIdQuery } from './FindUserLevelByIdQuery'
import { UserLevelResponse } from '../UserLevelResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/UserLevel/domain/ValueObjects/Id'

export class FindUserLevelByIdQueryHandler implements QueryHandler<FindUserLevelByIdQuery, UserLevelResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindUserLevelByIdQuery
  }

  async handle (data: FindUserLevelByIdQuery): Promise<UserLevelResponse> {
    return new UserLevelResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
