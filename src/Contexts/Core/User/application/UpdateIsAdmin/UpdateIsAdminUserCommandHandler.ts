import { Command } from '@Shared/domain/CommandBus/Command'
import { UpdateIsAdminCommand } from './UpdateIsAdminUserCommand'
import { UpdaterIsAdmin } from './UpdaterIsAdmin'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { IsAdmin } from '@Core/User/domain/ValueObjects/IsAdmin'
import { Id } from '@Core/User/domain/ValueObjects/Id'

export class UpdateIsAdminUserCommandHandler implements CommandHandler<UpdateIsAdminCommand> {
  constructor (private readonly updater: UpdaterIsAdmin) {}

  subscribedTo (): Command {
    return UpdateIsAdminCommand
  }

  async handle (command: UpdateIsAdminCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new IsAdmin(command.isAdmin)
    )
  }
}
