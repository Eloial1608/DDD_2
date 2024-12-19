import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { BanUserCommand } from './BanUserCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/User/domain/ValueObjects/Id'

export class BanUserCommandHandler implements CommandHandler<BanUserCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return BanUserCommand
  }

  async handle (command: BanUserCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id)
    )
  }
}
