import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler';
import { Command } from '@Shared/domain/CommandBus/Command';
import { Updater } from './Updater';
import { Id } from '@Core/Account/domain/ValueObjects/Id';
import { UpdateAccountCommand } from './UpdatePhoneNumberCommand';
import { PhoneNumber } from '../../domain/ValueObjects/PhoneNumber';

export class UpdateAccountCommandHandler implements CommandHandler<UpdateAccountCommand> {
  constructor(private readonly updater: Updater) {}

  subscribedTo(): Command {
    return UpdateAccountCommand;
  }

  async handle(command: UpdateAccountCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new PhoneNumber(command.phoneNumber)
    );
  }
}