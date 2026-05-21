import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject';

export enum AccountMovementTypeEnum {
  PAYMENT = 'PAYMENT',
  TRANSFER = 'TRANSFER',
  DEPOSIT = 'DEPOSIT',
  BIZUM = 'BIZUM',
  REFUND = 'REFUND',
  WITHDRAWAL = 'WITHDRAWAL',
  CREDIT_CARD_PAYMENT = 'CREDIT_CARD_PAYMENT',
  CREDIT_CARD_DEBT_PAYMENT = 'CREDIT_CARD_DEBT_PAYMENT'
}

export class AccountMovementType extends EnumValueObject<AccountMovementTypeEnum> {
  constructor(value: AccountMovementTypeEnum) {
    super(value, Object.values(AccountMovementTypeEnum));
  }

  protected throwErrorForInvalidValue(value: AccountMovementTypeEnum ): void {
    throw new Error(`Invalid transaction type: ${value}`);
  }

  static payment(): AccountMovementType {
    return new AccountMovementType(AccountMovementTypeEnum.PAYMENT);
  }

  static transfer(): AccountMovementType {
    return new AccountMovementType(AccountMovementTypeEnum.TRANSFER);
  }

  static deposit(): AccountMovementType {
    return new AccountMovementType(AccountMovementTypeEnum.DEPOSIT);
  }

  static bizum(): AccountMovementType {
    return new AccountMovementType(AccountMovementTypeEnum.BIZUM);
  }

  static refund(): AccountMovementType {
    return new AccountMovementType(AccountMovementTypeEnum.REFUND);
  }

  static withdrawal(): AccountMovementType {
    return new AccountMovementType(AccountMovementTypeEnum.WITHDRAWAL);
  }

  static creditCardPayment(): AccountMovementType {
    return new AccountMovementType(AccountMovementTypeEnum.CREDIT_CARD_PAYMENT);
  }

  static creditCardDebtPayment(): AccountMovementType {
    return new AccountMovementType(AccountMovementTypeEnum.CREDIT_CARD_DEBT_PAYMENT);
  }
}