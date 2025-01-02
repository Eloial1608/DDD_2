import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeletePostCommand } from './DeletePostCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { CommunityId } from '@Posts/Post/domain/ValueObjects/CommunityId'
import { UserId } from '@Posts/Post/domain/ValueObjects/UserId'

export class DeletePostCommandHandler implements CommandHandler<DeletePostCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeletePostCommand
  }

  async handle (command: DeletePostCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId)
    )
  }
}
