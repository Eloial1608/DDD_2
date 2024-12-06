import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteCommunityCommand } from './DeleteCommunityCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Community/domain/ValueObjects/Id'

export class DeleteCommunityCommandHandler implements CommandHandler<DeleteCommunityCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteCommunityCommand
  }

  async handle (command: DeleteCommunityCommand): Promise<void> {
    await this.deleter.run(new Id(command.id))
  }
}
