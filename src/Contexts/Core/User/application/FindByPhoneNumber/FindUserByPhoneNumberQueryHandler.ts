import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindUserByPhoneNumberQuery } from './FindUserByPhoneNumberQuery'
import { UserResponse } from '../UserResponse'
import { FinderByPhoneNumber } from './FinderByPhoneNumber'
import { Query } from '@Shared/domain/QueryBus/Query'
import { PhoneNumber } from '../../domain/ValueObjects/PhoneNumber'

export class FindUserByPhoneNumberQueryHandler implements QueryHandler<FindUserByPhoneNumberQuery, UserResponse> {
  constructor (private readonly finder: FinderByPhoneNumber) {}

  subscribedTo (): Query {
    return FindUserByPhoneNumberQuery
  }

  async handle (data: FindUserByPhoneNumberQuery): Promise<UserResponse> {    
    return new UserResponse(
      await this.finder.find(
        new PhoneNumber(data.phoneNumber)
      )
    )
  }
}