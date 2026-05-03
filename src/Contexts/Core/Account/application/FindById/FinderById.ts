import { Account } from "@Core/Account/domain/Account"
import { AccountRepository } from "@Core/Account/domain/AccountRepository"
import { AccountNotFound } from "@Core/Account/domain/Errors/AccountNotFound"
import { Id } from "@Core/Account/domain/ValueObjects/Id"

export class FinderById {
  constructor (private readonly repository: AccountRepository) {}

  async find (id: Id): Promise<Account> {
    const Account = await this.repository.find(id)

    if (!Account) throw new AccountNotFound(id)

    return Account
  }
}
