import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindUserByIdQuery } from './FindUserByIdQuery'
import { UserResponse } from '../UserResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/User/domain/ValueObjects/Id'

export class FindUserByIdQueryHandler implements QueryHandler<FindUserByIdQuery, UserResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindUserByIdQuery
  }

  async handle (data: FindUserByIdQuery): Promise<UserResponse> {
    return new UserResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
