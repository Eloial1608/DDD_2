import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateLevelCommand } from './UpdateLevelCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Updater } from '@Core/Level/application/Update/Updater'
import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Level/domain/ValueObjects/CommunityId'
import { MinimumExp } from '@Core/Level/domain/ValueObjects/MinimumExp'

export class UpdateLevelCommandHandler implements CommandHandler<UpdateLevelCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateLevelCommand
  }

  async handle (command: UpdateLevelCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new MinimumExp(command.minimumExp)
    )
  }
}
