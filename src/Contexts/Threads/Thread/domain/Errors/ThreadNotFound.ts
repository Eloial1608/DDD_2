import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class ThreadNotFound extends DomainError {
  protected code = 'thread-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A thread with id ${id} wasn't found`
  }
}
