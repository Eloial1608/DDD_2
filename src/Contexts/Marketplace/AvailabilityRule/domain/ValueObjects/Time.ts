import { ValueObject } from '@Shared/domain/ValueObjects/ValueObject'

export class Time extends ValueObject<string> {
  constructor (value: string) {
    super(value)
    if (!/^\d{2}:\d{2}$/.test(value)) throw new Error('Time must be in HH:mm format')
  }
}
