import { CardMovementId } from "../ValueObjects/CardMovementId";

export class CardMovementNotFound extends Error {
  constructor(id: CardMovementId) {
    super(`CardMovement with id ${id.valueOf()} not found`);
  }

  getMessage(): string {
    return this.message;
  }
}