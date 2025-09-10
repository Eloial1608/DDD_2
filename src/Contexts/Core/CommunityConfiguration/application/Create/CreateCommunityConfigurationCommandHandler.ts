import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateCommunityConfigurationCommand } from './CreateCommunityConfigurationCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/CommunityConfiguration/domain/ValueObjects/Id'
import { CommunityId } from '@Core/CommunityConfiguration/domain/ValueObjects/CommunityId'
import { CurrentTheme } from '../../domain/ValueObjects/CurrentTheme'

export class CreateCommunityConfigurationCommandHandler implements CommandHandler<CreateCommunityConfigurationCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateCommunityConfigurationCommand
  }

  async handle (command: CreateCommunityConfigurationCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      command.communityId ? new CommunityId(command.communityId) : null,
      command.currentTheme ? new CurrentTheme(command.currentTheme) : null
    )
  }
}
