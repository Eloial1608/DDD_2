import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Query } from '@Shared/domain/QueryBus/Query'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { mockFn } from '../../../mockUtils'

export class QueryBusMock implements QueryBus {
  private mockAsk = mockFn()

  private response?: QueryResponse<any>
  private fail?: DomainError

  private responseByQuery = new Map<Query, QueryResponse<any>>([])
  private failByQuery = new Map<Query, DomainError>([])
  private responseStack: QueryResponse<any>[] = []

  async ask<R extends QueryResponse<any>> (query: Query): Promise<R> {
    this.mockAsk(query)
    if (this.fail) {
      const error = this.fail
      this.fail = undefined
      throw error
    }

    if (this.failByQuery.has(query.constructor.name)) {
      throw this.failByQuery.get(query.constructor.name)
    }

    if (this.responseByQuery.has(query.constructor.name)) {
      return this.responseByQuery.get(query.constructor.name) as R
    }

    if (this.responseStack.length > 0) return this.responseStack.pop() as R

    return this.response as R
  }

  returnOnAsk<R extends QueryResponse<any>> (response: R): void {
    this.response = response
  }

  pushOnStack<R extends QueryResponse<any>> (response: R[]): void {
    this.responseStack.push(...response)
  }

  returnOnQuery<Q extends Query, R extends QueryResponse<any>> (query: Q, response: R): void {
    this.responseByQuery.set(query.constructor.name, response)
  }

  failOnQuery<Q extends Query, E extends DomainError> (query: Q, error: E): void {
    this.failByQuery.set(query.constructor.name, error)
  }

  failOnAsk<E extends DomainError> (error: E): void {
    this.fail = error
  }

  assertAskHasBeenCalledWith<Q extends Query> (query: Q): void {
    expect(this.mockAsk).toHaveBeenCalledWith(query)
  }
}
