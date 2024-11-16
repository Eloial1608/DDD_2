export interface QueryResponse<T extends any> {
    response: T | Array<T>
}
