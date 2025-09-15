import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateCommunityConfigurationCommand } from './UpdateCommunityConfigurationCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/CommunityConfiguration/domain/ValueObjects/Id'
import { CommunityId } from '@Core/CommunityConfiguration/domain/ValueObjects/CommunityId'
import { CurrentTheme } from '../../domain/ValueObjects/CurrentTheme'

export class UpdateCommunityConfigurationCommandHandler implements CommandHandler<UpdateCommunityConfigurationCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateCommunityConfigurationCommand
  }

  async handle (command: UpdateCommunityConfigurationCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      command.communityId ? new CommunityId(command.communityId) : null,
      command.currentTheme ? new CurrentTheme(command.currentTheme) : null
    )
  }
}
