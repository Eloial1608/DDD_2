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

  static fromAggregate (spaceMember: SpaceMember): CreateSpaceMemberCommand {
    return this.create(
      spaceMember.id.valueOf(),
      spaceMember.userId.valueOf(),
      spaceMember.spaceId.valueOf(),
      spaceMember.communityId.valueOf(),
      spaceMember.invitedBy?.valueOf(),
      spaceMember.invitedAt?.valueOf(),
      spaceMember.isModerator.valueOf()
    )
  }
}
