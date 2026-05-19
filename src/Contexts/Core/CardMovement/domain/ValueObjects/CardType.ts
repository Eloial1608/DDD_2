import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject';

export enum AccountMovementTypeEnum {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}

export class AccountMovementType extends EnumValueObject<AccountMovementTypeEnum> {
  constructor(value: AccountMovementTypeEnum) {
    super(value, Object.values(AccountMovementTypeEnum));
  }

  protected throwErrorForInvalidValue(value: AccountMovementTypeEnum ): void {
    throw new Error(`Invalid transaction type: ${value}`);
  }

  static debit(): AccountMovementType {
    return new AccountMovementType(AccountMovementTypeEnum.DEBIT);
  }

  static credit(): AccountMovementType {
    return new AccountMovementType(AccountMovementTypeEnum.CREDIT);
  }

  
}