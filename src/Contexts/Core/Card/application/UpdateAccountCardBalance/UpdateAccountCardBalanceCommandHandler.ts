import { Balance } from "@Core/Card/domain/ValueObjects/Balance";
import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { UpdateAccountCardBalanceCommand } from "./UpdateAccountCardBalanceCommand";
import { Updater } from "./Updater";
import { Id } from "@Core/Card/domain/ValueObjects/Id";

export class UpdateAccountCardBalanceCommandHandler
  implements CommandHandler<UpdateAccountCardBalanceCommand>
{
  constructor(private readonly updater: Updater) {}

  subscribedTo(): typeof UpdateAccountCardBalanceCommand {
    return UpdateAccountCardBalanceCommand;
  }

  async handle(command: UpdateAccountCardBalanceCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Balance(command.balance),
    );

  }
}