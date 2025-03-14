import { Thread } from '../domain/Thread'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { ThreadResponse, ThreadResponseBody } from './ThreadResponse'

export class ThreadCollectionResponse implements QueryResponse<Array<ThreadResponseBody>> {
  response: Array<ThreadResponseBody>

  constructor (thread: Array<Thread>) {
    this.response = thread.map(x => new ThreadResponse(x).response)
  }
}
