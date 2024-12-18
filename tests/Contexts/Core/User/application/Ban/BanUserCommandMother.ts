import { BanUserCommand } from '@Core/User/application/Ban/BanUserCommand'
import { User } from '@Core/User/domain/User'

export class BanUserCommandMother {
  static create (
    id: string
  ): BanUserCommand {
    return new BanUserCommand(
      id
    )
  }

  static fromAggregate (user: User): BanUserCommand {
    return this.create(
      user.id.valueOf()
    )
  }
}