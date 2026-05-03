import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound'
import { AccountRepository } from '@Core/Account/domain/AccountRepository'
import { Id } from '@Core/Account/domain/ValueObjects/Id'

export class Deleter {
  constructor (private readonly repository: AccountRepository) {}

  async run (id: Id) {
    const Account = await this.repository.find(id)

    if (!Account) throw new AccountNotFound(id)

    const deletedAccount = Account.delete()

    await this.repository.persist(deletedAccount)
  }
}