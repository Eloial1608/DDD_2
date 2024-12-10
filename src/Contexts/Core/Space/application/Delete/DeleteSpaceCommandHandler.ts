import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteSpaceCommand } from './DeleteSpaceCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Space/domain/ValueObjects/CommunityId'

export class DeleteSpaceCommandHandler implements CommandHandler<DeleteSpaceCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteSpaceCommand
  }

  async handle (command: DeleteSpaceCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId)
    )
  }
}
