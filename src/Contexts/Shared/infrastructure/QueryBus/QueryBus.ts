import { QueryBus as IQueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Query } from '@Shared/domain/QueryBus/Query'
import { QueryHandlerInformationMap } from '@Shared/domain/QueryBus/QueryHandlerInformationMap.ts'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export class QueryBus implements IQueryBus {
  constructor (private readonly handler: QueryHandlerInformationMap) {}

  async ask<R extends QueryResponse<any>> (query: Query): Promise<R> {
    return await this.handler.search(query).handle(query)
  }
}
