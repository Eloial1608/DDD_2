import { Id } from "@Core/Account/domain/ValueObjects/Id"
import { QueryHandler } from "@Shared/domain/QueryBus/QueryHandler"
import { Query } from "@Shared/domain/QueryBus/Query"
import { FinderById } from "./FinderById"
import { AccountResponse } from "../AccountResponse"
import { FindAcountByIdQuery } from "./FindAccountByIdQuery"

export class FindAccountByIdQueryHandler 
  implements QueryHandler<FindAcountByIdQuery, AccountResponse> {

  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindAcountByIdQuery
  }

  async handle (data: FindAcountByIdQuery): Promise<AccountResponse> {    
    const account = await this.finder.find(
      new Id(data.id)
    )

    return new AccountResponse(account)
  }
}