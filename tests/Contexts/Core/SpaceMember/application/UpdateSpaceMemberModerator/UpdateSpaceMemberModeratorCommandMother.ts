import { UpdateSpaceMemberModeratorCommand } from '@Core/SpaceMember/application/UpdateSpaceMemberModerator/UpdateSpaceMemberModeratorCommand'
import { SpaceMember } from '@Core/SpaceMember/domain/SpaceMember'

export class UpdateSpaceMemberModeratorCommandMother {
  static delete (id: string, communityId: string, isModerator: boolean): UpdateSpaceMemberModeratorCommand {
    return new UpdateSpaceMemberModeratorCommand(id, communityId, isModerator)
  }

  static fromAggregate (spaceMember: SpaceMember): UpdateSpaceMemberModeratorCommand {
    return this.delete(
      spaceMember.id.valueOf(),
      spaceMember.communityId.valueOf(),
      spaceMember.isModerator.valueOf()
    )
  }
}
