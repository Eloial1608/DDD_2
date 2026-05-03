import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject';

export enum AccountTypeEnum {
  CURRENT_ACCOUNT = 'CURRENT_ACCOUNT',
  PAYROLL_ACCOUNT = 'PAYROLL_ACCOUNT',
}

export class Type_Account extends EnumValueObject<AccountTypeEnum> {
  constructor(value: AccountTypeEnum) {
    super(value, Object.values(AccountTypeEnum));
  }

  protected throwErrorForInvalidValue(value: AccountTypeEnum): void {
    throw new Error(`Invalid account type: ${value}`);
  }

  static currentAccount(): Type_Account {
    return new Type_Account(AccountTypeEnum.CURRENT_ACCOUNT);
  }

  static payrollAccount(): Type_Account {
    return new Type_Account(AccountTypeEnum.PAYROLL_ACCOUNT);
  }
}