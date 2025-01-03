import { Like } from '../domain/Like'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type LikeResponseBody = {
    readonly id: string
    readonly postId: string
    readonly userId: string
    readonly createdAt: Date
}

export class LikeResponse implements QueryResponse<LikeResponseBody> {
  response: LikeResponseBody

  constructor (like: Like) {
    this.response = {
      id: like.id.valueOf(),
      postId: like.postId.valueOf(),
      userId: like.userId.valueOf(),
      createdAt: like.createdAt.valueOf()
    }
  }
}
