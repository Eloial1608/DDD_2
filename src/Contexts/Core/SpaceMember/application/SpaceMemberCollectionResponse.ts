import { SpaceMember } from '../domain/SpaceMember'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { SpaceMemberResponse, SpaceMemberResponseBody } from './SpaceMemberResponse'

export class SpaceMemberCollectionResponse implements QueryResponse<Array<SpaceMemberResponseBody>> {
  response: Array<SpaceMemberResponseBody>

  constructor (spacemember: Array<SpaceMember>) {
    this.response = spacemember.map(x => new SpaceMemberResponse(x).response)
  }
}
