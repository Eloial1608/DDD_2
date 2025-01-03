import { PostUser } from '../domain/PostUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type PostUserResponseBody = {
    readonly id: string
    readonly userId: string
    readonly postId: string
    readonly createdAt: Date
}

export class PostUserResponse implements QueryResponse<PostUserResponseBody> {
  response: PostUserResponseBody

  constructor (postUser: PostUser) {
    this.response = {
      id: postUser.id.valueOf(),
      userId: postUser.userId.valueOf(),
      postId: postUser.postId.valueOf(),
      createdAt: postUser.createdAt.valueOf()
    }
  }
}
