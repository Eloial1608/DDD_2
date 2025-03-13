import { ThreadUser } from '../domain/ThreadUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type ThreadUserResponseBody = {
    readonly id: string
    readonly userId: string
    readonly threadId: string
    readonly createdAt: Date
}

export class ThreadUserResponse implements QueryResponse<ThreadUserResponseBody> {
  response: ThreadUserResponseBody

  constructor (threadUser: ThreadUser) {
    this.response = {
      id: threadUser.id.valueOf(),
      userId: threadUser.userId.valueOf(),
      threadId: threadUser.threadId.valueOf(),
      createdAt: threadUser.createdAt.valueOf()
    }
  }
}
