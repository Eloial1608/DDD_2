import { Community } from '../domain/Community'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { CommunityResponse, CommunityResponseBody } from './CommunityResponse'

export class CommunityCollectionResponse implements QueryResponse<Array<CommunityResponseBody>> {
  response: Array<CommunityResponseBody>

  constructor (community: Array<Community>) {
    this.response = community.map(x => new CommunityResponse(x).response)
  }
}
