import { Account } from '../domain/Account';
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse';
import { AccountTypeEnum } from '../domain/ValueObjects/Type_Account';

export type AccountResponseBody = {
  readonly id: string;
  readonly iban: string;
  readonly balance: number;
  readonly id_user: string;
  readonly type_account: AccountTypeEnum;
  readonly phoneNumber: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};

export class AccountResponse implements QueryResponse<AccountResponseBody> {
  response: AccountResponseBody;

  constructor(account: Account) {
    this.response = {
      id: account.id.valueOf(),
      iban: account.iban.valueOf(),
      balance: account.balance.valueOf(),
      id_user: account.userId.valueOf(),
      type_account: account.type_account.valueOf(),
      phoneNumber: account.phoneNumber ? account.phoneNumber.valueOf() : null,
      createdAt: account.createdAt.valueOf(),
      updatedAt: account.updatedAt.valueOf(),
      deletedAt: account.deletedAt ? account.deletedAt.valueOf() : null
    };
  }
}