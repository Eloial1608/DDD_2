import { MediaUser } from '../domain/MediaUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type MediaUserResponseBody = {
    readonly id: string
    readonly userId: string
    readonly mediaId: string
    readonly createdAt: Date
}

export class MediaUserResponse implements QueryResponse<MediaUserResponseBody> {
  response: MediaUserResponseBody

  constructor (mediaUser: MediaUser) {
    this.response = {
      id: mediaUser.id.valueOf(),
      userId: mediaUser.userId.valueOf(),
      mediaId: mediaUser.mediaId.valueOf(),
      createdAt: mediaUser.createdAt.valueOf()
    }
  }
}
