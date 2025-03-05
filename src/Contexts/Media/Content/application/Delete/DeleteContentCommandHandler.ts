import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteContentCommand } from './DeleteContentCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Media/Content/domain/ValueObjects/Id'
import { CommunityId } from '@Media/Content/domain/ValueObjects/CommunityId'

export class DeleteContentCommandHandler implements CommandHandler<DeleteContentCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteContentCommand
  }

  async handle (command: DeleteContentCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId)
    )
  }
}
