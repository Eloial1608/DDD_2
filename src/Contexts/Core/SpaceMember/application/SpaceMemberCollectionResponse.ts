import { SpaceMember } from '../domain/SpaceMember'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { SpaceMemberResponse, SpaceMemberResponseBody } from './SpaceMemberResponse'

export class SpaceMemberCollectionResponse implements QueryResponse<Array<SpaceMemberResponseBody>> {
  response: Array<SpaceMemberResponseBody>

  constructor (spaceMember: Array<SpaceMember>) {
    this.response = spaceMember.map(x => new SpaceMemberResponse(x).response)
  }
}
