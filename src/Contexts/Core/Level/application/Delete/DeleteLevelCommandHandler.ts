import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteLevelCommand } from './DeleteLevelCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Level/domain/ValueObjects/CommunityId'

export class DeleteLevelCommandHandler implements CommandHandler<DeleteLevelCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteLevelCommand
  }

  async handle (command: DeleteLevelCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId)
    )
  }
}
