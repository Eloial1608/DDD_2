import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteSpaceUserTitleCommand } from './DeleteSpaceUserTitleCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Space/domain/ValueObjects/CommunityId'

export class DeleteSpaceUserTitleCommandHandler implements CommandHandler<DeleteSpaceUserTitleCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteSpaceUserTitleCommand
  }

  async handle (command: DeleteSpaceUserTitleCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId)
    )
  }
}
