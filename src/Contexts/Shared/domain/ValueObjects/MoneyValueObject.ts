import { NumberValueObject } from './IntValueObject'
import { StringValueObject } from './StringValueObject'
import currency from 'currency.js'

export class MoneyValueObjectValue extends NumberValueObject {
  constructor (value: number) {
    value = currency(value, { fromCents: false }).intValue
    super(value < 0 ? 0 : value)
  }

  getFormattedValue () {
    return currency(this.valueOf(), { fromCents: true })
  }
}

export class MoneyValueObjectCurrency extends StringValueObject {}

export abstract class MoneyValueObject {
  constructor (readonly value: MoneyValueObjectValue, readonly currency: MoneyValueObjectCurrency) {}
}
