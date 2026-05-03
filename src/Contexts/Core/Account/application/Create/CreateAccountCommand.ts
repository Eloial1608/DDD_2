import { AccountTypeEnum } from '@Core/Account/domain/ValueObjects/Type_Account';
import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateAccountCommand implements Command {
  constructor (
    readonly userId: string,
    readonly type_account: AccountTypeEnum
  ) {}
}