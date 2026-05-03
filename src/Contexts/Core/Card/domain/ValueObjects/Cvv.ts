import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject';

export class Cvv extends StringValueObject {
  constructor(value: string) {
    if (value.length !== 3 || !/^\d{3}$/.test(value)) {
      throw new Error('CVV must be 3 digits');
    }
    super(value);
  }
}