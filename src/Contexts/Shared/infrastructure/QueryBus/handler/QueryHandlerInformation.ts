import { Query } from "@Shared/domain/QueryBus/Query"
import { QueryHandler } from "@Shared/domain/QueryBus/QueryHandler"
import { QueryNotRegisteredError } from "@Shared/domain/QueryBus/QueryNotRegisteredError"

export class QueryHandlerInformation {
    private queryHandlersMap: Map<Query, QueryHandler<Query, any>>
    constructor (queryHandlers: QueryHandler<Query, any>[]) {
        this.queryHandlersMap = this.formatHandlers(queryHandlers)
    }

    private formatHandlers (
        queryHandlers: Array<QueryHandler<Query, any>>
      ): Map<Query, QueryHandler<Query, any>> {
        const handlersMap = new Map()
    
        queryHandlers.forEach(queryHandler => {
          handlersMap.set(queryHandler.subscribedTo(), queryHandler)
        })
    
        return handlersMap
      }
    
      public search (query: Query): QueryHandler<Query, any> {
        const queryHandler = this.queryHandlersMap.get(query.constructor)
    
        if (!queryHandler) {
          throw new QueryNotRegisteredError(query)
        }
    
        return queryHandler
      }
}