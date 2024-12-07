import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateAccountCommand } from './CreateAccountCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Account/domain/ValueObjects/Id'
import { Name } from '@Core/Account/domain/ValueObjects/Name'
import { Email } from '@Core/Account/domain/ValueObjects/Email'

export class CreateAccountCommandHandler implements CommandHandler<CreateAccountCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateAccountCommand
  }

  async handle (command: CreateAccountCommand): Promise<void> {
    await this.creator.run({
      id: new Id(command.id),
      name: new Name(command.name),
      email: new Email(command.email)
    })
  }
}
