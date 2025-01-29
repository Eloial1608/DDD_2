import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteFormCommand } from './DeleteFormCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Form/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Form/domain/ValueObjects/CommunityId'

export class DeleteFormCommandHandler implements CommandHandler<DeleteFormCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteFormCommand
  }

  async handle (command: DeleteFormCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId)
    )
  }
}
