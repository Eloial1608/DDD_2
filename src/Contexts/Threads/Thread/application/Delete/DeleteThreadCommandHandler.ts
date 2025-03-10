import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteThreadCommand } from './DeleteThreadCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { CommunityId } from '@Threads/Thread/domain/ValueObjects/CommunityId'
import { UserId } from '@Threads/Thread/domain/ValueObjects/UserId'

export class DeleteThreadCommandHandler implements CommandHandler<DeleteThreadCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteThreadCommand
  }

  async handle (command: DeleteThreadCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId)
    )
  }
}
