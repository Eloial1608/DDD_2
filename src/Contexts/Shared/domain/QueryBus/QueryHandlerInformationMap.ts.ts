import { Query } from './Query'
import { QueryHandler } from './QueryHandler'

export interface QueryHandlerInformationMap {
    search (query: Query): QueryHandler<Query, any>
}
