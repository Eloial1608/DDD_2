import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindByIbanQuery } from './FindByIbanQuery'
import { FinderByIban } from './FinderByIban'
import { Query } from '@Shared/domain/QueryBus/Query'
import { AccountResponse } from '../AccountResponse'

export class FindByIbanQueryHandler implements QueryHandler<FindByIbanQuery, AccountResponse> {
  constructor (private readonly finder: FinderByIban) {}

  subscribedTo (): Query {
    return FindByIbanQuery
  }

  async handle (data: FindByIbanQuery): Promise<AccountResponse> {
    return await this.finder.find(data.iban)
  }
}