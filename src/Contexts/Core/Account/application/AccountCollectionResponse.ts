import { Account } from '../domain/Account'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { AccountResponse, AccountResponseBody } from './AccountResponse'

export class AccountCollectionResponse implements QueryResponse<Array<AccountResponseBody>> {
  response: Array<AccountResponseBody>

  constructor (Account: Array<Account>) {
    this.response = Account.map(x => new AccountResponse(x).response)
  }
}
