import { CreateUserTitleCommand } from '@Core/UserTitle/application/Create/CreateUserTitleCommand'
import { UserTitle } from '@Core/UserTitle/domain/UserTitle'

export class CreateUserTitleCommandMother {
  static fromAggregate (userTitle: UserTitle): CreateUserTitleCommand {
    return new CreateUserTitleCommand(
      userTitle.id.valueOf(),
      userTitle.communityId.valueOf(),
      userTitle.titleId.valueOf(),
      userTitle.userId.valueOf()
    )
  }
}
