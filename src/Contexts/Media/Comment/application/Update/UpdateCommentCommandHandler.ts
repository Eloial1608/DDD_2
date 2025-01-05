import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateCommentCommand } from './UpdateCommentCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Media/Comment/domain/ValueObjects/Id'
import { UserId } from '@Media/Comment/domain/ValueObjects/UserId'
import { Content } from '@Media/Comment/domain/ValueObjects/Content'

export class UpdateCommentCommandHandler implements CommandHandler <UpdateCommentCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateCommentCommand
  }

  async handle (command: UpdateCommentCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new UserId(command.userId),
      new Content(command.content)
    )
  }
}
