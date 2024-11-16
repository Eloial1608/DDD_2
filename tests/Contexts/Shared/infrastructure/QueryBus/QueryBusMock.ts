import { Query } from '@Shared/domain/QueryBus/Query'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class QueryBusMock implements QueryBus {
  private asker = mockFn()

  private response: QueryResponse<any> | undefined

  async ask<R extends QueryResponse<any>> (query: Query): Promise<R> {
    this.asker(query)
    if (!this.response) throw new Error('No response')
    return this.response as unknown as R
  }

  returnOnAsk (response: QueryResponse<any>): void {
    this.response = response
  }

  assertQueryHasBeenAsk (query: Query): void {
    expect(this.asker).toHaveBeenCalledWith(query)
  }
}
