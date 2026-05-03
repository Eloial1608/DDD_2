import { NumberValueObject } from './IntValueObject'
import { StringValueObject } from './StringValueObject'
import currency from 'currency.js'

export class MoneyValueObjectValue extends NumberValueObject {
  constructor (value: number) {
    if (String(value).includes('.')) value = currency(value).intValue
    super(value < 0 ? 0 : value)
  }
}

export class MoneyValueObjectCurrency extends StringValueObject {}

export abstract class MoneyValueObject {
  constructor (readonly value: MoneyValueObjectValue, readonly currency: MoneyValueObjectCurrency) {}
}
