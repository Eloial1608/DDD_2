import type { DigitalStock } from '../domain/DigitalStock'
import type { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import type { AvailableDigitalStockType } from '../domain/ValueObjects/DigitalStockType'
import type { Nullable } from '@Shared/domain/Nullable'

export type DigitalStockResponseBody = {
  readonly id: string
  readonly communityId: string
  readonly productId: string
  readonly type: AvailableDigitalStockType
  readonly value: string
  readonly isAvailable: boolean
  readonly purchasedAt: Nullable<Date>
}

export class DigitalStockResponse implements QueryResponse<DigitalStockResponseBody> {
  response: DigitalStockResponseBody

  constructor (stock: DigitalStock) {
    this.response = {
      id: stock.id.valueOf(),
      communityId: stock.communityId.valueOf(),
      productId: stock.productId.valueOf(),
      type: stock.type.valueOf(),
      value: stock.value.valueOf(),
      isAvailable: stock.isAvailable.valueOf(),
      purchasedAt: stock.purchasedAt?.valueOf()
    }
  }
}
