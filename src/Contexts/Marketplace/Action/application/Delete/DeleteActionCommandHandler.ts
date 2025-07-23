import type { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteActionCommand } from './DeleteActionCommand'
import type { Command } from '@Shared/domain/CommandBus/Command'
import type { Deleter } from './Deleter'
import { Id } from '@Marketplace/Action/domain/ValueObjects/Id'

export class DeleteActionCommandHandler implements CommandHandler<DeleteActionCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteActionCommand
  }

  async handle (command: DeleteActionCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id)
    )
  }
}
