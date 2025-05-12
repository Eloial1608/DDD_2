import { NumberValueObject } from '@Shared/domain/ValueObjects/IntValueObject'

export class TotalRatings extends NumberValueObject {
  constructor (num: number) {
    super(num < 0 ? 0 : num)
  }
}
