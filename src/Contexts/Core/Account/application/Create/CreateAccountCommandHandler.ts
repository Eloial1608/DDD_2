import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Command } from '@Shared/domain/CommandBus/Command'
import { UserId } from '@Core/Account/domain/ValueObjects/UserId'
import { Creator } from '@Core/Account/application/Create/Creator'
import { AccountTypeEnum, Type_Account } from '@Core/Account/domain/ValueObjects/Type_Account'
import { CreateAccountCommand } from './CreateAccountCommand'

export class CreateAccountCommandHandler implements CommandHandler<CreateAccountCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateAccountCommand
  }

  async handle (command: CreateAccountCommand): Promise<void> {
    await this.creator.run(
      new UserId(command.userId),
      new Type_Account(command.type_account as AccountTypeEnum)
    )
  }
}