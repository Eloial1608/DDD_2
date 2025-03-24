import { Comment } from '../domain/Comment'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { CommentResponse, CommentResponseBody } from './CommentResponse'

export class CommentCollectionResponse implements QueryResponse<Array<CommentResponseBody>> {
  response: Array<CommentResponseBody>

  constructor (comment: Array<Comment>) {
    this.response = comment.map(x => new CommentResponse(x).response)
  }
}
