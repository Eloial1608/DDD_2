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

  constructor (spaceMember: SpaceMember) {
    this.response = {
      id: spaceMember.id.valueOf(),
      userId: spaceMember.userId.valueOf(),
      spaceId: spaceMember.spaceId.valueOf(),
      isModerator: spaceMember.isModerator.valueOf(),
      isBanned: spaceMember.isBanned.valueOf(),
      invitedBy: spaceMember.invitedBy?.valueOf(),
      invitedAt: spaceMember.invitedAt?.valueOf(),
      communityId: spaceMember.communityId.valueOf(),
      createdAt: spaceMember.createdAt.valueOf(),
      updatedAt: spaceMember.updatedAt.valueOf()
    }
  }
}
