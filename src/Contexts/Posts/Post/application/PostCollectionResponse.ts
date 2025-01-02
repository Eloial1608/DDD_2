import { Post } from '../domain/Post'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { PostResponse, PostResponseBody } from './PostResponse'

export class PostCollectionResponse implements QueryResponse<Array<PostResponseBody>> {
  response: Array<PostResponseBody>

  constructor (post: Array<Post>) {
    this.response = post.map(x => new PostResponse(x).response)
  }
}
