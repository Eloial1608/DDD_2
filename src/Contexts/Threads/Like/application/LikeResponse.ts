import { Like } from '../domain/Like'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type LikeResponseBody = {
    readonly id: string
    readonly threadId: string
    readonly userId: string
    readonly createdAt: Date
}

export class LikeResponse implements QueryResponse<LikeResponseBody> {
  response: LikeResponseBody

  constructor (like: Like) {
    this.response = {
      id: like.id.valueOf(),
      threadId: like.threadId.valueOf(),
      userId: like.userId.valueOf(),
      createdAt: like.createdAt.valueOf()
    }
  }
}
