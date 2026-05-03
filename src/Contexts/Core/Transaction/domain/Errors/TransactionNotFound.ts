import { Id } from "../ValueObjects/Id";

export class TransactionNotFound extends Error {
  constructor(id: Id) {
    super(`Transaction with id ${id.valueOf()} not found`);
  }

  getMessage(): string {
    return this.message;
  }
}