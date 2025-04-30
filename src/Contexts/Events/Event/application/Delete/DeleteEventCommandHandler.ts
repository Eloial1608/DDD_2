import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteEventCommand } from './DeleteEventCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Events/Event/domain/ValueObjects/Id'
import { CommunityId } from '@Events/Event/domain/ValueObjects/CommunityId'
import { UserId } from '@Events/Event/domain/ValueObjects/UserId'

export class DeleteEventCommandHandler implements CommandHandler<DeleteEventCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteEventCommand
  }

  async handle (command: DeleteEventCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId)
    )
  }
}
