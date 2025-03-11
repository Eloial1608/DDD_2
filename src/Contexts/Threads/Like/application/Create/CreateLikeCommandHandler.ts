import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateLikeCommand } from './CreateLikeCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Threads/Like/domain/ValueObjects/Id'
import { ThreadId } from '@Threads/Like/domain/ValueObjects/ThreadId'
import { UserId } from '@Threads/Like/domain/ValueObjects/UserId'

export class CreateLikeCommandHandler implements CommandHandler<CreateLikeCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateLikeCommand
  }

  async handle (command: CreateLikeCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new ThreadId(command.threadId),
      new UserId(command.userId)
    )
  }
}
