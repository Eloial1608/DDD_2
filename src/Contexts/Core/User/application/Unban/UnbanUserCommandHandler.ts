import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UnbanUserCommand } from './UnbanUserCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/User/domain/ValueObjects/Id'

export class UnbanUserCommandHandler implements CommandHandler<UnbanUserCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UnbanUserCommand
  }

  async handle (command: UnbanUserCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id)
    )
  }
}
