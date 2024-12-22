import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateSpaceMemberModeratorCommand } from './UpdateSpaceMemberModeratorCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { CommunityId } from '@Core/SpaceMember/domain/ValueObjects/CommunityId'
import { IsModerator } from '@Core/SpaceMember/domain/ValueObjects/IsModerator'

export class UpdateSpaceMemberModeratorCommandHandler implements CommandHandler<UpdateSpaceMemberModeratorCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateSpaceMemberModeratorCommand
  }

  async handle (command: UpdateSpaceMemberModeratorCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new IsModerator(command.isModerator)
    )
  }
}
