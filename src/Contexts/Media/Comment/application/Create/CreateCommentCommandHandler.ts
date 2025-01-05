import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateCommentCommand } from './CreateCommentCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Media/Comment/domain/ValueObjects/Id'
import { MediaId } from '@Media/Comment/domain/ValueObjects/MediaId'
import { UserId } from '@Media/Comment/domain/ValueObjects/UserId'
import { Content } from '@Media/Comment/domain/ValueObjects/Content'

export class CreateCommentCommandHandler implements CommandHandler <CreateCommentCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateCommentCommand
  }

  async handle (command: CreateCommentCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new MediaId(command.mediaId),
      new UserId(command.userId),
      new Content(command.content)
    )
  }
}
