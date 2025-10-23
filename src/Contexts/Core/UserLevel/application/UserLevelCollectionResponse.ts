import { UserLevel } from '../domain/UserLevel'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { UserLevelResponse, UserLevelResponseBody } from './UserLevelResponse'

export class UserLevelCollectionResponse implements QueryResponse<Array<UserLevelResponseBody>> {
  response: Array<UserLevelResponseBody>

  constructor (level: Array<UserLevel>) {
    this.response = level.map(x => new UserLevelResponse(x).response)
  }
}
