import { DeleteSpaceUserTitleCommand } from '@Core/SpaceUserTitle/application/Delete/DeleteSpaceUserTitleCommand'
import { SpaceUserTitle } from '@Core/SpaceUserTitle/domain/SpaceUserTitle'

export class DeleteSpaceUserTitleCommandMother {
  static delete (id: string, communityId: string): DeleteSpaceUserTitleCommand {
    return new DeleteSpaceUserTitleCommand(id, communityId)
  }

  static fromAggregate (spaceUserTitle: SpaceUserTitle): DeleteSpaceUserTitleCommand {
    return this.delete(
      spaceUserTitle.id.valueOf(),
      spaceUserTitle.communityId.valueOf()
    )
  }
}
