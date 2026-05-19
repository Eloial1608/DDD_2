import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Creator } from '@Core/CardMovement/application/Create/Creator'
import { CreateCardMovementCommand } from './CreateCardMovementCommand'
import { CardMovementId } from '@Core/CardMovement/domain/ValueObjects/CardMovementId'
import { CardId } from '@Core/CardMovement/domain/ValueObjects/CardId'
import { CardMovementAmount } from '@Core/CardMovement/domain/ValueObjects/CardMovementAmount'
import { CardMovementDescription } from '@Core/CardMovement/domain/ValueObjects/CardMovementDescription'

export class CreateCardMovementCommandHandler implements CommandHandler<CreateCardMovementCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateCardMovementCommand
  }

  async handle (command: CreateCardMovementCommand): Promise<void> {
    await this.creator.run(
      new CardMovementId(command.id),
      new CardId(command.cardId),
      new CardMovementAmount(command.amount),
      command.description ? new CardMovementDescription(command.description) : undefined,
      command.accountMovementId ? new CardMovementId(command.accountMovementId) : undefined
    )
  }
}