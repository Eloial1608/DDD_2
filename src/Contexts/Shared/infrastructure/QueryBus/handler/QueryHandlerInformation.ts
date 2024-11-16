import { Query } from '@Shared/domain/QueryBus/Query'
import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { QueryNotRegisteredError } from '@Shared/domain/QueryBus/QueryNotRegisteredError'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export class QueryHandlerInformation {
  private queryHandlersMap: Map<Query, QueryHandler<Query, QueryResponse<any>>>
  constructor (queryHandlers: QueryHandler<Query, any>[]) {
    this.queryHandlersMap = this.formatHandlers(queryHandlers)
  }

  private formatHandlers (
    queryHandlers: Array<QueryHandler<Query, QueryResponse<any>>>
  ): Map<Query, QueryHandler<Query, QueryResponse<any>>> {
    const handlersMap = new Map()

    queryHandlers.forEach(queryHandler => {
      handlersMap.set(queryHandler.subscribedTo(), queryHandler)
    })

    return handlersMap
  }

  public search (query: Query): QueryHandler<Query, QueryResponse<any>> {
    const queryHandler = this.queryHandlersMap.get(query.constructor)

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query)
    }

    return queryHandler
  }
}
