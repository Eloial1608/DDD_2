import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteCommunityConfigurationCommand } from './DeleteCommunityConfigurationCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/CommunityConfiguration/domain/ValueObjects/Id'
import { CommunityId } from '@Core/CommunityConfiguration/domain/ValueObjects/CommunityId'

export class DeleteCommunityConfigurationCommandHandler implements CommandHandler<DeleteCommunityConfigurationCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteCommunityConfigurationCommand
  }

  async handle (command: DeleteCommunityConfigurationCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId)
    )
  }
}
