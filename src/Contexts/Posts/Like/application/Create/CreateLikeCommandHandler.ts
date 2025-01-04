import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateLikeCommand } from './CreateLikeCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Posts/Like/domain/ValueObjects/Id'
import { PostId } from '@Posts/Like/domain/ValueObjects/PostId'
import { UserId } from '@Posts/Like/domain/ValueObjects/UserId'

export class CreateLikeCommandHandler implements CommandHandler<CreateLikeCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateLikeCommand
  }

  async handle (command: CreateLikeCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new PostId(command.postId),
      new UserId(command.userId)
    )
  }
}
