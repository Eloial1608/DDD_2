import { AccountMovement } from "@Core/AccountMovement/domain/AccountMovement";
import { QueryResponse } from "@Shared/domain/QueryBus/QueryResponse";
import { AccountMovementResponse, AccountMovementResponseBody } from "./AccountMovementResponse";

export class AccountMovementCollectionResponse implements QueryResponse<AccountMovementResponseBody[]> {
  response: AccountMovementResponseBody[];

  constructor(movements: AccountMovement[]) {
    this.response = movements.map(
      movement => new AccountMovementResponse(movement).response
    );
  }
}