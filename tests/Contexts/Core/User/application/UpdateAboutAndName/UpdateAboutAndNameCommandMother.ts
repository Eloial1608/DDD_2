import { UpdateAboutAndNameCommand } from '@Core/User/application/UpdateAboutAndName/UpdateAboutAndNameCommand'
import { User } from '@Core/User/domain/User'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateAboutAndNameUserCommandMother {
  static updateAboutAndName (
    id: string,
    about: Nullable<string>,
    name: string,
    username: string,
    pictureUrl: Nullable<string>,
    bannerUrl: Nullable<string>
  ):UpdateAboutAndNameCommand {
    return new UpdateAboutAndNameCommand(
      id,
      about,
      name,
      username,
      pictureUrl,
      bannerUrl
    )
  }

  static fromAggregate (user: User): UpdateAboutAndNameCommand {
    return this.updateAboutAndName(
      user.id.valueOf(),
      user.about?.valueOf(),
      user.name.valueOf(),
      user.username.valueOf(),
      user.pictureUrl?.valueOf(),
      user.bannerUrl?.valueOf()
    )
  }
}
