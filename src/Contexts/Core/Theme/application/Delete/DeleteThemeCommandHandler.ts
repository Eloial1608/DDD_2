import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteThemeCommand } from './DeleteThemeCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Theme/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Theme/domain/ValueObjects/CommunityId'

export class DeleteThemeCommandHandler implements CommandHandler<DeleteThemeCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteThemeCommand
  }

  async handle (command: DeleteThemeCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId)
    )
  }
}
