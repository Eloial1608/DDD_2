import { ThreadUser } from '../domain/ThreadUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { ThreadUserResponse, ThreadUserResponseBody } from './ThreadUserResponse'

export class ThreadUserCollectionResponse implements QueryResponse<Array<ThreadUserResponseBody>> {
  response: Array<ThreadUserResponseBody>

  constructor (threadUser: Array<ThreadUser>) {
    this.response = threadUser.map(x => new ThreadUserResponse(x).response)
  }
}
