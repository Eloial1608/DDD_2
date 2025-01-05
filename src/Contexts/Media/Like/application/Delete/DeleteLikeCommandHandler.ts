import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteLikeCommand } from './DeleteLikeCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Media/Like/domain/ValueObjects/Id'
import { UserId } from '@Media/Like/domain/ValueObjects/UserId'

export class DeleteLikeCommandHandler implements CommandHandler<DeleteLikeCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteLikeCommand
  }

  async handle (command: DeleteLikeCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new UserId(command.userId)
    )
  }
}
