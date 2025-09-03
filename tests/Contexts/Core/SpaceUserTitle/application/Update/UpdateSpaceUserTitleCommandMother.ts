import { UpdateSpaceUserTitleCommand } from '@Core/SpaceUserTitle/application/Update/UpdateSpaceUserTitleCommand'
import { SpaceUserTitle } from '@Core/SpaceUserTitle/domain/SpaceUserTitle'

export class UpdateSpaceUserTitleCommandMother {
  static fromAggregate(spaceUserTitle: SpaceUserTitle): UpdateSpaceUserTitleCommand {
    return new UpdateSpaceUserTitleCommand(
      spaceUserTitle.id.valueOf(),
      spaceUserTitle.communityId.valueOf(),
      spaceUserTitle.titleId.valueOf(),
    )
  }
}