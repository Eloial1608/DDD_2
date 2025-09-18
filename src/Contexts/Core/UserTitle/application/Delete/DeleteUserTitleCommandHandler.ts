import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteUserTitleCommand } from './DeleteUserTitleCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Space/domain/ValueObjects/CommunityId'

export class DeleteUserTitleCommandHandler implements CommandHandler<DeleteUserTitleCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteUserTitleCommand
  }

  async handle (command: DeleteUserTitleCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId)
    )
  }
}
