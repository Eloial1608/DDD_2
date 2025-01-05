import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateLikeCommand } from './CreateLikeCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Media/Like/domain/ValueObjects/Id'
import { MediaId } from '@Media/Like/domain/ValueObjects/MediaId'
import { UserId } from '@Media/Like/domain/ValueObjects/UserId'

export class CreateLikeCommandHandler implements CommandHandler<CreateLikeCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateLikeCommand
  }

  async handle (command: CreateLikeCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new MediaId(command.mediaId),
      new UserId(command.userId)
    )
  }
}
