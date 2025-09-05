import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateSpaceUserTitleCommand } from './UpdateSpaceUserTitleCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { CommunityId } from '@Core/SpaceUserTitle/domain/ValueObjects/CommunityId'
import { TitleId } from '@Core/SpaceUserTitle/domain/ValueObjects/TitleId'

export class UpdateSpaceUserTitleCommandHandler implements CommandHandler<UpdateSpaceUserTitleCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateSpaceUserTitleCommand
  }

  async handle (command: UpdateSpaceUserTitleCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new TitleId(command.titleId)
    )
  }
}
