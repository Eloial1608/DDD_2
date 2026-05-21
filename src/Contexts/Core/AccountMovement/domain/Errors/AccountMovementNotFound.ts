import { AccountMovementId } from "../ValueObjects/AccountMovementId";

export class AccountMovementNotFound extends Error {
  constructor(id: AccountMovementId) {
    super(`AccountMovement with id ${id.valueOf()} not found`);
  }

  getMessage(): string {
    return this.message;
  }
}