
import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { Updater } from "./Updater";
import { Id } from "@Core/Card/domain/ValueObjects/Id";
import { CardPin } from "../../domain/ValueObjects/CardPin";
import { UpdateCardPinCommand } from "./UpdateCardPinCommand";

export class UpdateCardPinCommandHandler
  implements CommandHandler<UpdateCardPinCommand>
{
  constructor(private readonly updater: Updater) {}

  subscribedTo(): typeof UpdateCardPinCommand {
    return UpdateCardPinCommand;
  }

  async handle(command: UpdateCardPinCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new CardPin(command.cardPin),
    );

  }
}