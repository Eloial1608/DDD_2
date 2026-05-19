import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Creator } from '@Core/AccountMovement/application/Create/Creator'
import { AccountMovementCommand } from './AccountMovementCommand'
import { AccountId } from '@Core/AccountMovement/domain/ValueObjects/AccountId'
import { TransferId } from '@Core/AccountMovement/domain/ValueObjects/TransferId'
import { AccountMovementAmount } from '@Core/AccountMovement/domain/ValueObjects/AccountMovementAmount'
import { AccountMovementType } from '@Core/AccountMovement/domain/ValueObjects/AccountMovementType'
import { AccountMovementDescription } from '@Core/AccountMovement/domain/ValueObjects/AccountMovementDescription'
import { RelatedAccountId } from '@Core/AccountMovement/domain/ValueObjects/RelatedAccountId'
import { CardId } from '@Core/AccountMovement/domain/ValueObjects/CardId'

export class AccountMovementCommandHandler implements CommandHandler<AccountMovementCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return AccountMovementCommand
  }

  async handle (command: AccountMovementCommand): Promise<void> {
    await this.creator.run(
      new AccountId(command.id),
      new TransferId(command.transferId),
      new AccountId(command.accountId),
      new AccountMovementAmount(command.amount),
      new AccountMovementType(command.type),
      new AccountMovementDescription(command.description),
      command.relatedAccountId ? new RelatedAccountId(command.relatedAccountId) : undefined,
      command.cardId ? new CardId(command.cardId) : undefined
    )
  }
}