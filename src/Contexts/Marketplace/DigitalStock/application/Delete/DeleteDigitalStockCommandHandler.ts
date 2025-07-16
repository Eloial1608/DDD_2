import type { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteDigitalStockCommand } from './DeleteDigitalStockCommand'
import type { Command } from '@Shared/domain/CommandBus/Command'
import type { Deleter } from './Deleter'
import { Id } from '@Marketplace/DigitalStock/domain/ValueObjects/Id'

export class DeleteDigitalStockCommandHandler implements CommandHandler<DeleteDigitalStockCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteDigitalStockCommand
  }

  async handle (command: DeleteDigitalStockCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id)
    )
  }
}
