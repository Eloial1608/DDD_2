import { CreateSpaceMemberCommand } from '@Core/SpaceMember/application/Create/CreateSpaceMemberCommand'
import { SpaceMember } from '@Core/SpaceMember/domain/SpaceMember'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateSpaceMemberCommandMother {
  static create (
    id: string,
    userId: string,
    spaceId: string,
    communityId: string,
    invitedBy: Nullable<string>,
    invitedAt: Nullable<Date>,
    isModerator: boolean
  ): CreateSpaceMemberCommand {
    return new CreateSpaceMemberCommand(
      id,
      userId,
      spaceId,
      communityId,
      isModerator,
      invitedBy,
      invitedAt
    )
  }

  static fromAggregate (spacemember: SpaceMember): CreateSpaceMemberCommand {
    return this.create(
      spacemember.id.valueOf(),
      spacemember.userId.valueOf(),
      spacemember.spaceId.valueOf(),
      spacemember.communityId.valueOf(),
      spacemember.invitedBy?.valueOf(),
      spacemember.invitedAt?.valueOf(),
      spacemember.isModerator.valueOf()
    )
  }
}
