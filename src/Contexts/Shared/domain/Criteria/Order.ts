import { OrderBy } from './OrderBy'
import { OrderType, OrderTypes } from './OrderType'

export class Order {
  readonly orderBy: OrderBy
  readonly orderType: OrderType

  constructor (orderBy: OrderBy, orderType: OrderType) {
    this.orderBy = orderBy
    this.orderType = orderType
  }

  static fromValues (orderBy?: string | string[], orderType?: string | string[]): Order[] {
    if (!orderBy) return []

    if (!Array.isArray(orderBy)) orderBy = [orderBy]
    if (!Array.isArray(orderType)) orderType = [orderType ?? OrderTypes.ASC]

    return this.fromArray(orderBy, orderType)
  }

  static none (): Order {
    return new Order(new OrderBy(''), new OrderType(OrderTypes.NONE))
  }

  static fromArray (orderBy: string[], orderType?: string[]): Order[] {
    const orders: Order[] = []
    for (const order in orderBy) {
      if (!orderBy[order]) {
        orders.push(Order.none())
        continue
      }

      orders.push(new Order(new OrderBy(orderBy[order]), OrderType.fromValue(orderType?.[order] || OrderTypes.ASC)))
    }

    return orders
  }

  static asArray (order: Order | Order[]): Order[] {
    return !Array.isArray(order) ? [order] : order
  }

  static desc (orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.DESC))
  }

  static asc (orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.ASC))
  }

  public hasOrder () {
    return !this.orderType.isNone()
  }
}
