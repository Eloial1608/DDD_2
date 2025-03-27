import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class TicketNotFound extends DomainError {
  protected code = 'ticket-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A ticket with id ${id} wasn't found`
  }
}
