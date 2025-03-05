import { Content } from '../domain/Content'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { ContentResponse, ContentResponseBody } from './ContentResponse'

export class ContentCollectionResponse implements QueryResponse<Array<ContentResponseBody>> {
  response: Array<ContentResponseBody>

  constructor (content: Array<Content>) {
    this.response = content.map(x => new ContentResponse(x).response)
  }
}
