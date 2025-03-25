import { SpaceMember } from '../domain/SpaceMember'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type SpaceMemberResponseBody = {
    readonly id: string
    readonly userId: string
    readonly spaceId: string
    readonly isModerator: boolean
}

export class SpaceMemberResponse implements QueryResponse<SpaceMemberResponseBody> {
  response: SpaceMemberResponseBody

  constructor (spaceMember: SpaceMember) {
    this.response = {
      id: spaceMember.id.valueOf(),
      userId: spaceMember.userId.valueOf(),
      spaceId: spaceMember.spaceId.valueOf(),
      isModerator: spaceMember.isModerator.valueOf()
    }
  }
}
