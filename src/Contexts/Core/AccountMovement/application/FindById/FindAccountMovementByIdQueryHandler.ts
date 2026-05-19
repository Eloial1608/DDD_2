import { QueryHandler } from "@Shared/domain/QueryBus/QueryHandler"
import { Query } from "@Shared/domain/QueryBus/Query"
import { AccountMovementResponse } from "../AccountMovementResponse"
import { FindAccountMovementByIdQuery } from "./FindAccountMovementByIdQuery"
import { FinderById } from "./FinderById"
import { AccountId } from "@Core/CardMovement/domain/ValueObjects/AccountId"

export class FindAccountMovementByIdQueryHandler implements QueryHandler<FindAccountMovementByIdQuery, AccountMovementResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindAccountMovementByIdQuery
  }

  async handle (data: FindAccountMovementByIdQuery): Promise<AccountMovementResponse> {    
    return new AccountMovementResponse(
      await this.finder.find(
        new AccountId(data.id)
      )
    )
  }
}