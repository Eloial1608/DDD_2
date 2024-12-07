import { CreateUserCommand } from '@Core/User/application/Create/CreateUserCommand'
import { User } from '@Core/User/domain/User'

export class CreateUserCommandMother {
  static create (
    id: string,
    name: string,
    email: string,
    communityId: string
  ): CreateUserCommand {
    return new CreateUserCommand(
      id,
      name,
      email,
      communityId
    )
  }

  static fromAggregate (user: User): CreateUserCommand {
    return this.create(
      user.id.valueOf(),
      user.name.valueOf(),
      user.email.valueOf(),
      user.communityId.valueOf()
    )
  }
}
