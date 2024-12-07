import { Account } from '../domain/Account'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { AccountResponse, AccountResponseBody } from './AccountResponse'

export class AccountCollectionResponse implements QueryResponse<Array<AccountResponseBody>> {
  response: Array<AccountResponseBody>

  constructor (account: Array<Account>) {
    this.response = account.map(x => new AccountResponse(x).response)
  }
}
