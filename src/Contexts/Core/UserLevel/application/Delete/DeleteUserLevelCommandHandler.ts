import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteUserLevelCommand } from './DeleteUserLevelCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/UserLevel/domain/ValueObjects/Id'
import { CommunityId } from '@Core/UserLevel/domain/ValueObjects/CommunityId'

export class DeleteUserLevelCommandHandler implements CommandHandler<DeleteUserLevelCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteUserLevelCommand
  }

  async handle (command: DeleteUserLevelCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId)
    )
  }
}
