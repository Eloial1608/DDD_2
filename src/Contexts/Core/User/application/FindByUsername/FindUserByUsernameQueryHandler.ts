import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindUserByUsernameQuery } from './FindUserByUsernameQuery'
import { UserResponse } from '../UserResponse'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Username } from '../../domain/ValueObjects/Username'
import { FinderByUsername } from './FinderByUsername'

export class FindUserByUsernameQueryHandler implements QueryHandler<FindUserByUsernameQuery, UserResponse> {
  constructor (private readonly finder: FinderByUsername) {}

  subscribedTo (): Query {
    return FindUserByUsernameQuery
  }

  async handle (data: FindUserByUsernameQuery): Promise<UserResponse> {    
    return new UserResponse(
      await this.finder.find(
        new Username(data.username)
      )
    )
  }
}