import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateCommentCommand } from './CreateCommentCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Posts/Comment/domain/ValueObjects/Id'
import { PostId } from '@Posts/Comment/domain/ValueObjects/PostId'
import { UserId } from '@Posts/Comment/domain/ValueObjects/UserId'
import { Author } from '@Posts/Comment/domain/ValueObjects/Author'
import { Content } from '@Posts/Comment/domain/ValueObjects/Content'
import { CreatedAt } from '@Posts/Comment/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Posts/Comment/domain/ValueObjects/UpdatedAt'

export class CreateCommentCommandHandler implements CommandHandler <CreateCommentCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateCommentCommand
  }

  async handle (command: CreateCommentCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new PostId(command.postId),
      new UserId(command.userId),
      new Author(
        command.author.id,
        command.author.mainId,
        command.author.name,
        command.author.username,
        command.author.pictureUrl,
        command.author.bannerUrl
      ),
      new Content(command.content),
      new CreatedAt(command.createdAt),
      new UpdatedAt(command.updatedAt),
    )
  }
}
