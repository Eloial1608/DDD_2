import { Query } from './Query'
import { QueryResponse } from './QueryResponse'

export interface QueryHandler<Q extends Query, R extends QueryResponse<any>> {
    subscribedTo (): Q
    handle(data: Q): Promise<R>
}
