import { DeleteCommunityCommand } from '@Core/Community/application/Delete/DeleteCommunityCommand'
import { Community } from '@Core/Community/domain/Community'

export class DeleteCommunityCommandMother {
  static delete (id: string): DeleteCommunityCommand {
    return new DeleteCommunityCommand(id)
  }

  static fromAggregate (community: Community): DeleteCommunityCommand {
    return this.delete(
      community.id.valueOf()
    )
  }
}
