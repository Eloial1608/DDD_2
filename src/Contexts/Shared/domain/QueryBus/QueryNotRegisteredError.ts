import { DomainError } from '../Errors/DomainError'
import { Query } from './Query'

export class QueryNotRegisteredError extends DomainError {
  protected code = 'query-not-registered'
  protected message

  constructor (q: Query) {
    super()
    this.message = `The query ${q.constructor.name} is not registered to any handler`
  }
}
