import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class EventUserNotFound extends DomainError {
  protected code = 'event-user-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A event user with id ${id} wasn't found`
  }
}
