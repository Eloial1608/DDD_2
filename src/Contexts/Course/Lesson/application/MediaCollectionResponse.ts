import { Media } from '../domain/Media'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { MediaResponse, MediaResponseBody } from './MediaResponse'

export class MediaCollectionResponse implements QueryResponse<Array<MediaResponseBody>> {
  response: Array<MediaResponseBody>

  constructor (media: Array<Media>) {
    this.response = media.map(x => new MediaResponse(x).response)
  }
}
