import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteTitleCommand } from './DeleteTitleCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Deleter } from './Deleter'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'

export class DeleteTitleCommandHandler implements CommandHandler<DeleteTitleCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteTitleCommand
  }

  async handle (command: DeleteTitleCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId),
    )
  }
}
