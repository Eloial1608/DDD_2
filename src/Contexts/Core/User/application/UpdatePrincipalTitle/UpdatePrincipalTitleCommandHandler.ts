import { Command } from '@Shared/domain/CommandBus/Command'
import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'
import { UpdatePrincipalTitleCommand } from './UpdatePrincipalTitleCommand'
import { UpdaterPrincipalTitle } from './UpdaterPrincipalTitle'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { PrincipalTitle } from '@Core/User/domain/ValueObjects/PrincipalTitle'

export class UpdatePrincipalTitleCommandHandler implements CommandHandler<UpdatePrincipalTitleCommand> {
  constructor (private readonly updater: UpdaterPrincipalTitle) {}

  subscribedTo (): Command {
    return UpdatePrincipalTitleCommand
  }

  async handle (command: UpdatePrincipalTitleCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      command.principalTitle != null ? new PrincipalTitle(command.principalTitle) : null,
      new CommunityId(command.communityId)
    )
  }
}
