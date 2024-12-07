import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindAccountByIdQuery } from './FindAccountByIdQuery'
import { AccountResponse } from '../AccountResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/Account/domain/ValueObjects/Id'

export class FindAccountByIdQueryHandler implements QueryHandler<FindAccountByIdQuery, AccountResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindAccountByIdQuery
  }

  async handle (data: FindAccountByIdQuery): Promise<AccountResponse> {
    return new AccountResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
