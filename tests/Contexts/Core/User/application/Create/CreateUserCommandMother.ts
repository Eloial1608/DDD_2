import { CreateUserCommand } from '@Core/User/application/Create/CreateUserCommand'
import { User } from '@Core/User/domain/User'

export class CreateUserCommandMother {
  static create (
    id: string,
    name: string,
    email: string,
    communityId: string,
    isAdmin: boolean,
    isOwner: boolean
  ): CreateUserCommand {
    return new CreateUserCommand(
      id,
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
      user.name.valueOf(),
      user.email.valueOf(),
      user.communityId.valueOf(),
      user.isAdmin.valueOf(),
      user.isOwner.valueOf()
    )
  }
}
