import { User } from '../domain/User'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { UserResponse, UserResponseBody } from './UserResponse'

export class UserCollectionResponse implements QueryResponse<Array<UserResponseBody>> {
  response: Array<UserResponseBody>

  constructor (user: Array<User>) {
    this.response = user.map(x => new UserResponse(x).response)
  }
}
