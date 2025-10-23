import { NumberValueObject } from '@Shared/domain/ValueObjects/IntValueObject'

export class SlotDurationMinutes extends NumberValueObject {
  constructor (value: number) {
    super(value)
    if (!Number.isInteger(value) || value <= 0) throw new Error('Slot duration must be a positive integer')
  }
}
