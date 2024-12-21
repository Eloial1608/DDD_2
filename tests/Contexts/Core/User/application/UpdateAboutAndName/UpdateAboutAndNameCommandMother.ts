import { UpdateAboutAndNameCommand } from '@Core/User/application/UpdateAboutAndName/UpdateAboutAndNameCommand'
import { User } from '@Core/User/domain/User'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateAboutAndNameUserCommandMother {
  static updateAboutAndName(
    id: string,
    about: Nullable<string>,
    name: string,
    communityId: string
  ):UpdateAboutAndNameCommand {
    return new UpdateAboutAndNameCommand(
      id,
      about,
      name,
      communityId
    )
  }

  static fromAggregate(user: User): UpdateAboutAndNameCommand {
    return this.updateAboutAndName(
      user.id.valueOf(),
      user.about?.valueOf(),
      user.name.valueOf(),
      user.communityId.valueOf()
    )
  }
}
