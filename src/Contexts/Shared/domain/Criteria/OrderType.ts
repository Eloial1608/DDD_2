import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'

export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

export class OrderType extends EnumValueObject<OrderTypes> {
  constructor (value: OrderTypes) {
    super(value, Object.values(OrderTypes))
  }

  static fromValue (value: string): OrderType {
    switch (value) {
      case OrderTypes.ASC:
        return new OrderType(OrderTypes.ASC)
      case OrderTypes.DESC:
        return new OrderType(OrderTypes.DESC)
      default:
        throw new InvalidArgumentError(`The order type ${value} is invalid`)
    }
  }

  public isNone (): boolean {
    return this.valueOf() === OrderTypes.NONE.valueOf()
  }

  public isAsc (): boolean {
    return this.valueOf() === OrderTypes.ASC.valueOf()
  }

  protected throwErrorForInvalidValue (value: OrderTypes): void {
    throw new InvalidArgumentError(`The order type ${value} is invalid`)
  }
}
