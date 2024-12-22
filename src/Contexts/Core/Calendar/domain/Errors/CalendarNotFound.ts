import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class CalendarNotFound extends DomainError {
  protected code = 'calendar-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A calendar with id ${id} wasn't found`
  }
}
