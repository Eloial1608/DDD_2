import { DeleteSpaceMemberCommand } from '@Core/SpaceMember/application/Delete/DeleteSpaceMemberCommand'
import { SpaceMember } from '@Core/SpaceMember/domain/SpaceMember'

export class DeleteSpaceMemberCommandMother {
  static delete (id: string, communityId: string): DeleteSpaceMemberCommand {
    return new DeleteSpaceMemberCommand(id, communityId)
  }

  static fromAggregate (spacemember: SpaceMember): DeleteSpaceMemberCommand {
    return this.delete(
      spacemember.id.valueOf(),
      spacemember.communityId.valueOf()
    )
  }
}
