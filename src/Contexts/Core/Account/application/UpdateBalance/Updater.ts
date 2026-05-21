import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound';
import { AccountRepository } from '@Core/Account/domain/AccountRepository';
import { Id } from '@Core/Account/domain/ValueObjects/Id';
import { Balance } from '@Core/Account/domain/ValueObjects/Balance';

export class Updater {
  constructor(private readonly repository: AccountRepository) {}

  async run(id: Id, balance: Balance) {
    const account = await this.repository.find(id);

    if (!account) throw new AccountNotFound(id);

    const updatedAccount = account.updateBalance(
      balance
    );

    await this.repository.persist(updatedAccount);
  }
}