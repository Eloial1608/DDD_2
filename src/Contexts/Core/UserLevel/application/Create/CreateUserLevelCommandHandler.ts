import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/UserLevel/domain/ValueObjects/Id'
import { CreateUserLevelCommand } from './CreateUserLevelCommand'
import { CommunityId } from '@Core/UserLevel/domain/ValueObjects/CommunityId'
import { UserId } from '@Core/UserLevel/domain/ValueObjects/UserId'
import { CurrentExp } from '@Core/UserLevel/domain/ValueObjects/CurrentExp'
import { LevelId } from '@Core/UserLevel/domain/ValueObjects/LevelId'

export class CreateUserLevelCommandHandler implements CommandHandler<CreateUserLevelCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateUserLevelCommand
  }

  async handle (command: CreateUserLevelCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId),
      new LevelId(command.levelId),
      new CurrentExp(command.currentExp)
    )
  }
}
