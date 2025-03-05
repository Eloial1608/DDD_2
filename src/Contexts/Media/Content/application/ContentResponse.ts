import { Content } from '../domain/Content'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type ContentResponseBody = {
    readonly id: string
    readonly communityId: string
    readonly mediaId: string
    readonly url: string
    readonly type: string
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class ContentResponse implements QueryResponse<ContentResponseBody> {
  response: ContentResponseBody

  constructor (content: Content) {
    this.response = {
      id: content.id.valueOf(),
      communityId: content.communityId.valueOf(),
      mediaId: content.mediaId.valueOf(),
      url: content.url.valueOf(),
      type: content.type.valueOf(),
      createdAt: content.createdAt.valueOf(),
      updatedAt: content.updatedAt.valueOf()
    }
  }
}
