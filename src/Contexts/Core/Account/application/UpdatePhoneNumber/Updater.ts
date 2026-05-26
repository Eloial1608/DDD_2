import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound';
import { AccountRepository } from '@Core/Account/domain/AccountRepository';
import { Id } from '@Core/Account/domain/ValueObjects/Id';
import { PhoneNumber } from '@Core/Account/domain/ValueObjects/PhoneNumber';

export class Updater {
  constructor(private readonly repository: AccountRepository) {}

  async run(id: Id, phoneNumber: PhoneNumber) {
    const account = await this.repository.find(id);

    if (!account) throw new AccountNotFound(id);

    const updatedAccount = account.updatePhoneNumber(
      phoneNumber
    );

    await this.repository.persist(updatedAccount);
  }
}