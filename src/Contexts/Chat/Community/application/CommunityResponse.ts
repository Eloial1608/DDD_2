import { Community } from '../domain/Community'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type CommunityResponseBody = {
    readonly id: string
    readonly isPrivate: boolean
}

export class CommunityResponse implements QueryResponse<CommunityResponseBody> {
  response: CommunityResponseBody

  constructor (community: Community) {
    this.response = {
      id: community.id.valueOf(),
      isPrivate: community.isPrivate.valueOf()
    }
  }
}
