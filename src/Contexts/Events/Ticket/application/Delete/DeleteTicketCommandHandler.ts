import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteTicketCommand } from './DeleteTicketCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Events/Ticket/domain/ValueObjects/Id'

export class DeleteTicketCommandHandler implements CommandHandler<DeleteTicketCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteTicketCommand
  }

  async handle (command: DeleteTicketCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id)
    )
  }
}
