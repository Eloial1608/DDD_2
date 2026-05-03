import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler';
import { Command } from '@Shared/domain/CommandBus/Command';


import { Updater } from './Updater';

import { Id } from '@Core/Account/domain/ValueObjects/Id';
import { Iban } from '@Core/Account/domain/ValueObjects/Iban';
import { Balance } from '@Core/Account/domain/ValueObjects/Balance';
import { Type_Account } from '@Core/Account/domain/ValueObjects/Type_Account';
import { UpdateAccountCommand } from './UpdateAccountCommand';

export class UpdateAccountCommandHandler implements CommandHandler<UpdateAccountCommand> {
  constructor(private readonly updater: Updater) {}

  subscribedTo(): Command {
    return UpdateAccountCommand;
  }

  async handle(command: UpdateAccountCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Iban(command.iban),
      new Balance(command.balance),
      new Type_Account(command.type_account)
    );
  }
}