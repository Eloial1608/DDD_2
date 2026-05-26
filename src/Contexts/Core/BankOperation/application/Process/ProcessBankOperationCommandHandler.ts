import { Command } from "@Shared/domain/CommandBus/Command"
import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler"
import { ProcessBankOperationCommand } from "./ProcessBankOperationCommand"
import { ProcessBankOperationCreator } from "./ProcessBankOperationCreator"
import { AccountMovementType, AccountMovementTypeEnum } from "src/Contexts/Core/AccountMovement/domain/ValueObjects/AccountMovementType"

export class ProcessBankOperationCommandHandler
  implements CommandHandler<ProcessBankOperationCommand> {

  constructor(
    private readonly creator: ProcessBankOperationCreator
  ) {}

  subscribedTo(): Command {
    return ProcessBankOperationCommand
  }

  async handle(command: ProcessBankOperationCommand): Promise<void> {
    await this.creator.run(new AccountMovementType(command.type as AccountMovementTypeEnum), command.payload)
  }
}