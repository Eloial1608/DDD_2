import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class EventNotFound extends DomainError {
  protected code = 'event-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A event with id ${id} wasn't found`
  }
}
