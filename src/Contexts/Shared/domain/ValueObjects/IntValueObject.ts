import { ValueObject } from '@Shared/domain/ValueObjects/ValueObject'

export abstract class NumberValueObject extends ValueObject<number> {
  constructor (value: number) {
    super(value)
  }

  equalsTo (other: NumberValueObject): boolean {
    return this.valueOf === other.valueOf
  }

  isBiggerThan (other: NumberValueObject): boolean {
    return this.valueOf > other.valueOf
  }
}
