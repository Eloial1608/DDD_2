import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject';

export enum CardTypeEnum {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
}
export class Type_Card extends EnumValueObject<CardTypeEnum> {

  constructor(value: CardTypeEnum) {
    super(value, Object.values(CardTypeEnum));
  }

  protected throwErrorForInvalidValue(value: CardTypeEnum): void {
    throw new Error(`Invalid card type: ${value}`);
  }

  isDebit(): boolean {
    return this.valueOf() === CardTypeEnum.DEBIT_CARD;
  }

  isCredit(): boolean {
    return this.valueOf() === CardTypeEnum.CREDIT_CARD;
  }

  static fromEnum(value: CardTypeEnum): Type_Card {
    return new Type_Card(value);
  }
}