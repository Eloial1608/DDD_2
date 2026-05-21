import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler';
import { Command } from '@Shared/domain/CommandBus/Command';
import { Updater } from './Updater';
import { Id } from '@Core/Account/domain/ValueObjects/Id';
import { Balance } from '@Core/Account/domain/ValueObjects/Balance';
import { UpdateAccountBalanceCommand } from './UpdateAccountBalanceCommand';

export class UpdateAccountBalanceCommandHandler implements CommandHandler<UpdateAccountBalanceCommand> {
  constructor(private readonly updater: Updater) {}

  subscribedTo(): Command {
    return UpdateAccountBalanceCommand;
  }

  async handle(command: UpdateAccountBalanceCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Balance(command.balance),
    );
  }
}