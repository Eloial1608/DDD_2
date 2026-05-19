import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindUserByEmailQuery } from './FindUserByEmailQuery'
import { UserResponse } from '../UserResponse'
import { FinderByEmail } from './FinderByEmail'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Email } from '@Core/User/domain/ValueObjects/Email'

export class FindUserByEmailQueryHandler implements QueryHandler<FindUserByEmailQuery, UserResponse> {
  constructor (private readonly finder: FinderByEmail) {}

  subscribedTo (): Query {
    return FindUserByEmailQuery
  }

  async handle (data: FindUserByEmailQuery): Promise<UserResponse> {    
    return new UserResponse(
      await this.finder.find(
        new Email(data.email)
      )
    )
  }
}