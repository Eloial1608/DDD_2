import { DeleteSpaceCommand } from '@Core/Space/application/Delete/DeleteSpaceCommand'
import { Space } from '@Core/Space/domain/Space'

export class DeleteSpaceCommandMother {
  static delete (id: string, communityId: string): DeleteSpaceCommand {
    return new DeleteSpaceCommand(id, communityId)
  }

  static fromAggregate (space: Space): DeleteSpaceCommand {
    return this.delete(
      space.id.valueOf(),
      space.communityId.valueOf()
    )
  }
}
