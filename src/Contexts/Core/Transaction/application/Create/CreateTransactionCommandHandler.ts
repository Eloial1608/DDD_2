import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Command } from '@Shared/domain/CommandBus/Command'

import { TransactionTypeEnum } from '@Core/Transaction/domain/ValueObjects/Transaction_Status'
import { CreateTransactionCommand } from './CreateTransactionCommand'

import { AccountId } from '@Core/Transaction/domain/ValueObjects/AccountId'
import { Concept } from '@Core/Transaction/domain/ValueObjects/Concept'
import { Reference } from '@Core/Transaction/domain/ValueObjects/Reference'
import { Creator } from './Creator'
import { Balance } from '@Core/Transaction/domain/ValueObjects/Balance'

export class CreateTransactionCommandHandler
  implements CommandHandler<CreateTransactionCommand>
{
  constructor(private readonly creator: Creator) {}

  subscribedTo(): Command {
    return CreateTransactionCommand
  }

  async handle(command: CreateTransactionCommand): Promise<void> {
    await this.creator.run(
      command.status as TransactionTypeEnum,
      new Balance(command.balance),
      new AccountId(command.fromAccountId!),
      new AccountId(command.toAccountId!),
      new Concept(command.concept!),
      new Reference(command.reference!)
    )
  }
}