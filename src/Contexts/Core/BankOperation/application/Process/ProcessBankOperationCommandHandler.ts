import { Command } from "@Shared/domain/CommandBus/Command"
import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler"
import { ProcessBankOperationCommand } from "./ProcessBankOperationCommand"
import { ProcessBankOperationCreator } from "./ProcessBankOperationCreator"
<<<<<<< HEAD
import { AccountMovementType, AccountMovementTypeEnum } from "src/Contexts/Core/AccountMovement/domain/ValueObjects/AccountMovementType"
=======
import { AccountMovementType, AccountMovementTypeEnum } from "@Core/AccountMovements/domain/ValueObjects/AccountMovementType"
>>>>>>> c914353dbcac19047f94d4043d947759801ff024

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