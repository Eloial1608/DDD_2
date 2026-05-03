import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject';

export class CardPin extends StringValueObject {
  constructor(value: string) {
    if (String(value).length !== 4) {
      throw new Error('Card PIN must be 4 digits');
    }

    super(String(value));
  }
}