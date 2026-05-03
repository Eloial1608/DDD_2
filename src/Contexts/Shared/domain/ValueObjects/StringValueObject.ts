import { ValueObject } from '@Shared/domain/ValueObjects/ValueObject'

export abstract class StringValueObject extends ValueObject<string> {
  constructor (value: string) {
    super(value)
  }
}
