import { Id } from "../ValueObjects/Id";

export class CardMovementNotFound extends Error {
  constructor(id: Id) {
    super(`CardMovement with id ${id.valueOf()} not found`);
  }

  getMessage(): string {
    return this.message;
  }
}