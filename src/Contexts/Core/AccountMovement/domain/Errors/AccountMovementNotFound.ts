import { Id } from "../ValueObjects/Id";

export class AccountMovementNotFound extends Error {
  constructor(id: Id) {
    super(`AccountMovement with id ${id.valueOf()} not found`);
  }

  getMessage(): string {
    return this.message;
  }
}