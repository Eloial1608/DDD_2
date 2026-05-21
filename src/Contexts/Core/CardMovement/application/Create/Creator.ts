import { CardId } from "@Core/CardMovement/domain/ValueObjects/CardId";
import { CardMovement } from "@Core/CardMovement/domain/CardMovement";
import { CardMovementRepository } from "@Core/CardMovement/domain/CardMovmentRepository";
import { CardMovementId } from "@Core/CardMovement/domain/ValueObjects/CardMovementId";
import { CardMovementAmount } from "@Core/CardMovement/domain/ValueObjects/CardMovementAmount";
import { CardMovementDescription } from "@Core/CardMovement/domain/ValueObjects/CardMovementDescription";
import { CardMovementAlreadyExists } from "@Core/CardMovement/domain/Errors/CardMovementAlreadyExists";
import { TransferId } from "../../domain/ValueObjects/TransferId";

export class Creator {
  constructor(readonly repository: CardMovementRepository) {}

  async run(
    id: CardMovementId,
    operationId: TransferId,
    cardId: CardId,
    amount: CardMovementAmount,
    description?: CardMovementDescription,
    accountMovementId?: CardMovementId
  ): Promise<void> {
    await this.ensureNotExists(id);

    const movement = CardMovement.create(
      id,
      operationId,
      cardId,
      amount,
      description,
      accountMovementId
    );

    await this.repository.persist(movement);
  }

  private async ensureNotExists(id: CardMovementId): Promise<void> {
   const existing = await this.repository.find(id);

    if (existing) {
      throw new CardMovementAlreadyExists(id);
    }
  }
}