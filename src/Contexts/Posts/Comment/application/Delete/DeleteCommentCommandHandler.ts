import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteCommentCommand } from './DeleteCommentCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Posts/Comment/domain/ValueObjects/Id'
import { UserId } from '@Posts/Comment/domain/ValueObjects/UserId'

export class DeleteCommentCommandHandler implements CommandHandler<DeleteCommentCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteCommentCommand
  }

  async handle (command: DeleteCommentCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new UserId(command.userId)
    )
  }
}
