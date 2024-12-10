import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteSpaceMemberCommand } from './DeleteSpaceMemberCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { CommunityId } from '@Core/SpaceMember/domain/ValueObjects/CommunityId'

export class DeleteSpaceMemberCommandHandler implements CommandHandler<DeleteSpaceMemberCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteSpaceMemberCommand
  }

  async handle (command: DeleteSpaceMemberCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId)
    )
  }
}
