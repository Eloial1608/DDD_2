import { CreateSpaceUserTitleCommand } from '@Core/SpaceUserTitle/application/Create/CreateSpaceUserTitleCommand'
import { SpaceUserTitle } from '@Core/SpaceUserTitle/domain/SpaceUserTitle'

export class CreateSpaceUserTitleCommandMother {
  static fromAggregate (spaceUserTitle: SpaceUserTitle): CreateSpaceUserTitleCommand {
    return new CreateSpaceUserTitleCommand(
      spaceUserTitle.id.valueOf(),
      spaceUserTitle.communityId.valueOf(),
      spaceUserTitle.titleId.valueOf(),
      spaceUserTitle.userId.valueOf(),
      spaceUserTitle.spaceId.valueOf()
    )
  }
}
