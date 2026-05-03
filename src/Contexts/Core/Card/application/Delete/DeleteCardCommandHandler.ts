import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteCardCommand } from './DeleteCardCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Deleter } from './Deleter'
import { Id } from '@Core/Card/domain/ValueObjects/Id'

export class DeleteCardCommandHandler implements CommandHandler<DeleteCardCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteCardCommand
  }

  async handle (command: DeleteCardCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id)
    )
  }
}
