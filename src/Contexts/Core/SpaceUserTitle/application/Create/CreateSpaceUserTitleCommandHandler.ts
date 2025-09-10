import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/SpaceUserTitle/domain/ValueObjects/Id'
import { CreateSpaceUserTitleCommand } from './CreateSpaceUserTitleCommand'
import { CommunityId } from '@Core/SpaceUserTitle/domain/ValueObjects/CommunityId'
import { TitleId } from '@Core/SpaceUserTitle/domain/ValueObjects/TitleId'
import { UserId } from '@Core/SpaceUserTitle/domain/ValueObjects/UserId'
import { SpaceId } from '@Core/SpaceUserTitle/domain/ValueObjects/SpaceId'

export class CreateSpaceUserTitleCommandHandler implements CommandHandler<CreateSpaceUserTitleCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateSpaceUserTitleCommand
  }

  async handle (command: CreateSpaceUserTitleCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new TitleId(command.titleId),
      new UserId(command.userId),
      new SpaceId(command.spaceId)
    )
  }
}
