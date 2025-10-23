import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { CreateLevelCommand } from './CreateLevelCommand'
import { CommunityId } from '@Core/Level/domain/ValueObjects/CommunityId'
import { LevelNumber } from '@Core/Level/domain/ValueObjects/LevelNumber'
import { MinimumExp } from '@Core/Level/domain/ValueObjects/MinimumExp'

export class CreateLevelCommandHandler implements CommandHandler<CreateLevelCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateLevelCommand
  }

  async handle (command: CreateLevelCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new LevelNumber(command.levelNumber),
      new MinimumExp(command.minimumExp)
    )
  }
}
