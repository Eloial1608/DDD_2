import { Nullable } from '@Shared/domain/Nullable'
import { Comment } from '../domain/Comment'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type CommentResponseBody = {
    readonly id: string
    readonly courseId: string
    readonly userId: string
    readonly content: string
    readonly author: {
      id: string
      mainId: string
      name: string
      username: string
      bannerUrl: Nullable<string>
      pictureUrl: Nullable<string>
    }
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class CommentResponse implements QueryResponse<CommentResponseBody> {
  response: CommentResponseBody

  constructor (comment: Comment) {
    this.response = {
      id: comment.id.valueOf(),
      courseId: comment.courseId.valueOf(),
      userId: comment.userId.valueOf(),
      content: comment.content.valueOf(),
      author: comment.author.toPrimitives(),
      createdAt: comment.createdAt.valueOf(),
      updatedAt: comment.updatedAt.valueOf()
    }
  }
}
