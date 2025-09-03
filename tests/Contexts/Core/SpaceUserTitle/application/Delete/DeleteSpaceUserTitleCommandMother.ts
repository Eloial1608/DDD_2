import { DeleteSpaceUserTitleCommand } from '@Core/SpaceUserTitle/application/Delete/DeleteSpaceUserTitleCommand'
import { SpaceUserTitle } from '@Core/SpaceUserTitle/domain/SpaceUserTitle'

export class DeleteSpaceUserTitleCommandMother {
  static fromAggregate (spaceUserTitle: SpaceUserTitle): DeleteSpaceUserTitleCommand {
    return new DeleteSpaceUserTitleCommand(
      spaceUserTitle.id.valueOf(),
      spaceUserTitle.communityId.valueOf()
    )
  }
}
