import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteCalendarCommand } from './DeleteCalendarCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Calendar/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Calendar/domain/ValueObjects/CommunityId'

export class DeleteCalendarCommandHandler implements CommandHandler<DeleteCalendarCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteCalendarCommand
  }

  async handle (command: DeleteCalendarCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId)
    )
  }
}
