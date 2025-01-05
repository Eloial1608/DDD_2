import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteMediaCommand } from './DeleteMediaCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Media/Media/domain/ValueObjects/Id'
import { CommunityId } from '@Media/Media/domain/ValueObjects/CommunityId'
import { UserId } from '@Media/Media/domain/ValueObjects/UserId'

export class DeleteMediaCommandHandler implements CommandHandler<DeleteMediaCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteMediaCommand
  }

  async handle (command: DeleteMediaCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId)
    )
  }
}
