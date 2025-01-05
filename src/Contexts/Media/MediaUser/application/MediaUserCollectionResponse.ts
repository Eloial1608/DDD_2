import { MediaUser } from '../domain/MediaUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { MediaUserResponse, MediaUserResponseBody } from './MediaUserResponse'

export class MediaUserCollectionResponse implements QueryResponse<Array<MediaUserResponseBody>> {
  response: Array<MediaUserResponseBody>

  constructor (mediaUser: Array<MediaUser>) {
    this.response = mediaUser.map(x => new MediaUserResponse(x).response)
  }
}
