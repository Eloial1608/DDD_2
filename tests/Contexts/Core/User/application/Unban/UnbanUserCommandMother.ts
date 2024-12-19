import { UnbanUserCommand } from '@Core/User/application/Unban/UnbanUserCommand'
import { User } from '@Core/User/domain/User'

export class UnbanUserCommandMother {
  static create (
    id: string
  ): UnbanUserCommand {
    return new UnbanUserCommand(
      id
    )
  }

  static fromAggregate (user: User): UnbanUserCommand {
    return this.create(
      user.id.valueOf()
    )
  }
}
