import { CreateAccountCommand } from '@Core/Account/application/Create/CreateAccountCommand'
import { Account } from '@Core/Account/domain/Account'

export class CreateAccountCommandMother {
  static create (
    id: string,
    name: string,
    email: string
  ): CreateAccountCommand {
    return new CreateAccountCommand(
      id,
      name,
      email
    )
  }

  static fromAggregate (account: Account): CreateAccountCommand {
    return this.create(
      account.id.valueOf(),
      account.name.valueOf(),
      account.email.valueOf()
    )
  }
}
