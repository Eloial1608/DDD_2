import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteProjectCommand } from './DeleteProjectCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { CommunityId } from '@Projects/Project/domain/ValueObjects/CommunityId'
import { UserId } from '@Projects/Project/domain/ValueObjects/UserId'
import { Id } from '@Projects/Project/domain/ValueObjects/Id'

export class DeleteProjectCommandHandler implements CommandHandler<DeleteProjectCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteProjectCommand
  }

  async handle (command: DeleteProjectCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId)
    )
  }
}
