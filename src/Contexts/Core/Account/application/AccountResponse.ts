import { Nullable } from '@Shared/domain/Nullable'
import { Account } from '../domain/Account'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type AccountResponseBody = {
    readonly id: string
    readonly name: string
    readonly email: string
    readonly createdAt: Date
    readonly methodId: Nullable<string>
}

export class AccountResponse implements QueryResponse<AccountResponseBody> {
  response: AccountResponseBody

  constructor (account: Account) {
    this.response = {
      id: account.id.valueOf(),
      name: account.name.valueOf(),
      email: account.email.valueOf(),
      methodId: account.methodId?.valueOf(),
      createdAt: account.createdAt.valueOf()
    }
  }
}
