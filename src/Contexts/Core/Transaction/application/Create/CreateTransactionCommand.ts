
import { TransactionTypeEnum } from "@Core/Transaction/domain/ValueObjects/Transaction_Status";
import { Command } from "@Shared/domain/CommandBus/Command";


export class CreateTransactionCommand implements Command {

  constructor (
    readonly status: TransactionTypeEnum,
    readonly balance: number,
    readonly fromAccountId?: string,
    readonly toAccountId?: string,
    readonly concept?: string,
    readonly reference?: string,
  ) {}
}