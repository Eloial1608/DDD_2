import { Balance } from "@Core/Card/domain/ValueObjects/Balance";
import { CardPin } from "@Core/Card/domain/ValueObjects/CardPin";
import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { UpdateCardCommand } from "./UpdateCardCommand";
import { Updater } from "./Updater";
import { Id } from "@Core/Card/domain/ValueObjects/Id";
import { IsBlocked } from "../../domain/ValueObjects/IsBlocked";

export class UpdateCardCommandHandler
  implements CommandHandler<UpdateCardCommand>
{
  constructor(private readonly updater: Updater) {}

  subscribedTo(): typeof UpdateCardCommand {
    return UpdateCardCommand;
  }

  async handle(command: UpdateCardCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Balance(command.balance),
      new Balance(command.limit),
      new CardPin(command.cardPin),
      new IsBlocked(command.isBlocked)
    );

  }
}