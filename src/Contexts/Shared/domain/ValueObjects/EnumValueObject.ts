import { ValueObject } from '@Shared/domain/ValueObjects/ValueObject'

export abstract class EnumValueObject<T extends Object> extends ValueObject<T> {
  constructor (value: T, public readonly validValues: T[]) {
    super(value)
    this.checkValueIsValid(value)
  }

  public checkValueIsValid (value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value)
    }
  }

  protected abstract throwErrorForInvalidValue(value: T): void;
}
