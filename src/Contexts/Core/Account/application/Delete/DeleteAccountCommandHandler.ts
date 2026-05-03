import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteAccountCommand } from './DeleteAccountCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Deleter } from './Deleter'
import { Id } from '@Core/Account/domain/ValueObjects/Id'

export class DeleteAccountCommandHandler implements CommandHandler<DeleteAccountCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteAccountCommand
  }

  async handle (command: DeleteAccountCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id)
    )
  }
}
