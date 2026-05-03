import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound';
import { AccountRepository } from '@Core/Account/domain/AccountRepository';

import { Id } from '@Core/Account/domain/ValueObjects/Id';
import { Iban } from '@Core/Account/domain/ValueObjects/Iban';
import { Balance } from '@Core/Account/domain/ValueObjects/Balance';
import { Type_Account } from '@Core/Account/domain/ValueObjects/Type_Account';

export class Updater {
  constructor(private readonly repository: AccountRepository) {}

  async run(
    id: Id, iban: Iban, balance: Balance, type_account: Type_Account) {
    const account = await this.repository.find(id);

    if (!account) throw new AccountNotFound(id);

    const updatedAccount = account.update(
      iban,
      balance,
      type_account
    );

    await this.repository.persist(updatedAccount);
  }
}