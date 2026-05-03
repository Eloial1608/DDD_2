import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject';

export enum TransactionTypeEnum {
  PAYMENT = 'PAYMENT',
  TRANSFER = 'TRANSFER',
  INCOME = 'INCOME',
  BIZOM = 'BIZOM',
  REFUND = 'REFUND'
}

export class Transaction_Status extends EnumValueObject<TransactionTypeEnum> {
  constructor(value: TransactionTypeEnum) {
    super(value, Object.values(TransactionTypeEnum));
  }

  protected throwErrorForInvalidValue(value: TransactionTypeEnum): void {
    throw new Error(`Invalid transaction type: ${value}`);
  }

  static payment(): Transaction_Status {
    return new Transaction_Status(TransactionTypeEnum.PAYMENT);
  }

  static transfer(): Transaction_Status {
    return new Transaction_Status(TransactionTypeEnum.TRANSFER);
  }

  static income(): Transaction_Status {
    return new Transaction_Status(TransactionTypeEnum.INCOME);
  }

  static bizom(): Transaction_Status {
    return new Transaction_Status(TransactionTypeEnum.BIZOM);
  }

  static refund(): Transaction_Status {
    return new Transaction_Status(TransactionTypeEnum.REFUND);
  }
}