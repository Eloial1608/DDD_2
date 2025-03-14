import { Like } from '../domain/Like'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { LikeResponse, LikeResponseBody } from './LikeResponse'

export class LikeCollectionResponse implements QueryResponse<Array<LikeResponseBody>> {
  response: Array<LikeResponseBody>

  constructor (like: Array<Like>) {
    this.response = like.map(x => new LikeResponse(x).response)
  }
}
