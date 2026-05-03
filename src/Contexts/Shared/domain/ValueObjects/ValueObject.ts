export abstract class ValueObject<T extends Object> {
  private _value: T

  constructor (value: T) {
    this._value = value
  }

  public equals (o: ValueObject<T>): boolean {
    return this._value === o.valueOf()
  }

  toJSON () {
    return this.toString()
  }

  toString () {
    if (this._value) {
      return this._value.toString()
    }

    return this._value
  }

  valueOf () {
    return this._value
  }
}
