import { ValueObject } from '@Shared/domain/ValueObjects/ValueObject'

export class TimeRange extends ValueObject<{ start: string, end: string }> {
  constructor (start: string, end: string) {
    if (!/^\d{2}:\d{2}$/.test(start) || !/^\d{2}:\d{2}$/.test(end)) throw new Error('Time must be in HH:mm format')
    super({ start, end })
  }
}
