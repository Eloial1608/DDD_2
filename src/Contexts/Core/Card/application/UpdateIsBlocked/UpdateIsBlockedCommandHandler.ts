
import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { Updater } from "./Updater";
import { Id } from "@Core/Card/domain/ValueObjects/Id";
import { UpdateIsBlockedCommand } from "./UpdateIsBlockedCommand";
import { IsBlocked } from "../../domain/ValueObjects/IsBlocked";

export class UpdateIsBlockedCommandHandler implements CommandHandler<UpdateIsBlockedCommand>{
  constructor(private readonly updater: Updater) {}

  subscribedTo(): typeof UpdateIsBlockedCommand {
    return UpdateIsBlockedCommand;
  }

  async handle(command: UpdateIsBlockedCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new IsBlocked(command.isBlocked),
    );

  }
}