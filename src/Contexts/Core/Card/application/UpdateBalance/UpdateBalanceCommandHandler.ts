import { Balance } from "@Core/Card/domain/ValueObjects/Balance";
import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { UpdateBalanceCommand } from "./UpdateBalanceCommand";
import { Updater } from "./Updater";
import { Id } from "@Core/Card/domain/ValueObjects/Id";

export class UpdateBalanceCommandHandler
  implements CommandHandler<UpdateBalanceCommand>
{
  constructor(private readonly updater: Updater) {}

  subscribedTo(): typeof UpdateBalanceCommand {
    return UpdateBalanceCommand;
  }

  async handle(command: UpdateBalanceCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Balance(command.balance),
    );

  }
}