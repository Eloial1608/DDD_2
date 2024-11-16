import { ValueObject } from './ValueObject'

export class ArrayValueObject<T extends ValueObject<any>> extends ValueObject<Array<T>> {
  contains (item: T) {
    return this.valueOf().includes(item)
  }
}
