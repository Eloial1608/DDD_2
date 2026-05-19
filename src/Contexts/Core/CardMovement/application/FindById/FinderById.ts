import { Id } from "@Core/CardMovement/domain/ValueObjects/Id"
import { CardMovement } from "@Core/CardMovement/domain/CardMovement"
import { CardMovementRepository } from "@Core/CardMovement/domain/CardMovmentRepository"
import { CardMovementNotFound } from "@Core/CardMovement/domain/Errors/CardMovementNotFound"


export class FinderById {

  constructor(private readonly repository: CardMovementRepository) {}

  async find(id: Id): Promise<CardMovement> {

    const cardMovement = await this.repository.find(id)

    if (!cardMovement) {
      throw new CardMovementNotFound(id)
    }

    return cardMovement
  }
}