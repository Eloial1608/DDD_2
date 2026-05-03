import { Command } from '@Shared/domain/CommandBus/Command';

export enum AccountTypeEnum {
  CURRENT_ACCOUNT = 'CURRENT_ACCOUNT',
  PAYROLL_ACCOUNT = 'PAYROLL_ACCOUNT',
}

export class UpdateAccountCommand implements Command {
  constructor(
    readonly id: string,
    readonly iban: string,
    readonly balance: number,
    readonly type_account: AccountTypeEnum
  ) {}
}