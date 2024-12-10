import { Nullable } from '@Shared/domain/Nullable'
import { SpaceMember } from '../domain/SpaceMember'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type SpaceMemberResponseBody = {
  readonly id: string
  readonly userId: string
  readonly spaceId: string
  readonly communityId: string
  readonly invitedBy: Nullable<string>
  readonly invitedAt: Nullable<Date>
  readonly isModerator: boolean
  readonly isBanned: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class SpaceMemberResponse implements QueryResponse<SpaceMemberResponseBody> {
  response: SpaceMemberResponseBody

  constructor (spacemember: SpaceMember) {
    this.response = {
      id: spacemember.id.valueOf(),
      userId: spacemember.userId.valueOf(),
      spaceId: spacemember.spaceId.valueOf(),
      isModerator: spacemember.isModerator.valueOf(),
      isBanned: spacemember.isBanned.valueOf(),
      invitedBy: spacemember.invitedBy?.valueOf(),
      invitedAt: spacemember.invitedAt?.valueOf(),
      communityId: spacemember.communityId.valueOf(),
      createdAt: spacemember.createdAt.valueOf(),
      updatedAt: spacemember.updatedAt.valueOf()
    }
  }
}
