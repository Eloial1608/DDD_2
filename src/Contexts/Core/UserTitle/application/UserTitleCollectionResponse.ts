import { UserTitle } from '../domain/UserTitle'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { UserTitleResponse, UserTitleResponseBody } from './UserTitleResponse'

export class UserTitleCollectionResponse implements QueryResponse<Array<UserTitleResponseBody>> {
  response: Array<UserTitleResponseBody>

  constructor (userTitle: Array<UserTitle>) {
    this.response = userTitle.map(x => new UserTitleResponse(x).response)
  }
}
