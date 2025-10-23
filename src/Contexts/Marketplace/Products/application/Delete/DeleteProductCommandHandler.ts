import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteProductCommand } from './DeleteProductCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Deleter } from './Deleter'
import { Id } from '@Marketplace/Products/domain/ValueObjects/Id'

export class DeleteProductCommandHandler implements CommandHandler<DeleteProductCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteProductCommand
  }

  async handle (command: DeleteProductCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id)
    )
  }
}
