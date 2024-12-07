import { AccountRepository } from '@Core/Account/domain/AccountRepository'
import { Id } from '@Core/Account/domain/ValueObjects/Id'
import { Account } from '@Core/Account/domain/Account'
import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound'

export class FinderById {
  constructor (private readonly repository: AccountRepository) {}

  async find (id: Id): Promise<Account> {
    const account = await this.repository.find(id)

    if (!account) throw new AccountNotFound(id)

    return account
  }
}
