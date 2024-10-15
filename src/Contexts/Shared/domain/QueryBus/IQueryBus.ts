import { Query } from "./Query";
import { QueryResponse } from "./QueryResponse";

export interface IQueryBus {
    ask<R extends QueryResponse<any>>(query: Query): Promise<R>
}