import { ValueObject } from '@Shared/domain/ValueObjects/ValueObject'

export class Weekday extends ValueObject<number> {
  constructor (value: number) {
    super(value)
    if (value < 0 || value > 6) throw new Error('Weekday must be between 0 (Sunday) and 6 (Saturday)')
  }
}
