import type { DigitalStock } from '../domain/DigitalStock'
import type { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { DigitalStockResponse, type DigitalStockResponseBody } from './DigitalStockResponse'

export class DigitalStockCollectionResponse implements QueryResponse<Array<DigitalStockResponseBody>> {
  response: Array<DigitalStockResponseBody>

  constructor (stocks: Array<DigitalStock>) {
    this.response = stocks.map(x => new DigitalStockResponse(x).response)
  }
}
