import { ValueObject } from '@Shared/domain/ValueObjects/ValueObject'

export class ExceptionDate extends ValueObject<string> {
  constructor (value: string) {
    super(value)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Date must be in YYYY-MM-DD format')
  }
}
