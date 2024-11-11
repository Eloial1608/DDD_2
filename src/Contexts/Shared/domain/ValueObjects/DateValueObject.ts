import { ValueObject } from './ValueObject'

export abstract class DateValueObject extends ValueObject<Date> {
  constructor (value: Date) {
    super(DateValueObject.removeMilliseconds(new Date(value)))
  }

  private static removeMilliseconds (date: Date): Date {
    return new Date(date.setMilliseconds(0))
  }

  public daysOfDifference (date: Date): number {
    const oneDay = 1000 * 60 * 60 * 24

    const diffInTime = this.valueOf().getTime() - date.getTime()

    return Math.round(diffInTime / oneDay)
  }

  public daysFromToday (): number {
    return this.daysOfDifference(new Date())
  }
}
