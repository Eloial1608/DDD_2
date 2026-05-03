
import { LimitCard } from "@Core/Card/domain/ValueObjects/LimitCard";
import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { UpdateCardLimitCommand } from "./UpdateCardLimitCommand";
import { UpdateCardLimit } from "./UpdateCardLimit";
import { Id } from "@Core/Card/domain/ValueObjects/Id";

export class UpdateCardLimitCommandHandler
  implements CommandHandler<UpdateCardLimitCommand>
{
  constructor(private readonly updater: UpdateCardLimit) {}

  subscribedTo(): typeof UpdateCardLimitCommand {
    return UpdateCardLimitCommand;
  }

  async handle(command: UpdateCardLimitCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new LimitCard(command.limitCard)
    );
  }
}