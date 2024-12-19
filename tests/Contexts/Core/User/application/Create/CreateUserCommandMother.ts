import { CreateUserCommand } from '@Core/User/application/Create/CreateUserCommand'
import { User } from '@Core/User/domain/User'

export class CreateUserCommandMother {
  static create (
    id: string,
    mainId: string,
    name: string,
    email: string,
    communityId: string,
    isAdmin: boolean,
    isOwner: boolean
  ): CreateUserCommand {
    return new CreateUserCommand(
      id,
      mainId,
      name,
      email,
      communityId,
      isAdmin,
      isOwner
    )
  }

  static fromAggregate (user: User): CreateUserCommand {
    return this.create(
      user.id.valueOf(),
      user.mainId.valueOf(),
      user.name.valueOf(),
      user.email.valueOf(),
      user.communityId.valueOf(),
      user.isAdmin.valueOf(),
      user.isOwner.valueOf()
    )
  }
}
