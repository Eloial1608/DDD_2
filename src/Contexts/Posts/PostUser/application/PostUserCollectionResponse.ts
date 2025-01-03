import { PostUser } from '../domain/PostUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { PostUserResponse, PostUserResponseBody } from './PostUserResponse'

export class PostUserCollectionResponse implements QueryResponse<Array<PostUserResponseBody>> {
  response: Array<PostUserResponseBody>

  constructor (postUser: Array<PostUser>) {
    this.response = postUser.map(x => new PostUserResponse(x).response)
  }
}
