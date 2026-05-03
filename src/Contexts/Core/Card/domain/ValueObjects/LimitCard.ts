import { NumberValueObject } from '@Shared/domain/ValueObjects/IntValueObject';

export class LimitCard extends NumberValueObject {
constructor(value: number) {
    super(value);
  if (value === null || value === undefined) {
    throw new Error('LimitCard cannot be null');
  }
}
}