import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class EndDateEarlierThanStartDate extends DomainError {
  protected code = 'end-date-earlier-than-start-date'
  protected message

  constructor (id: Id) {
    super()
    this.message = `End date earlier than start date in course with id ${id}`
  }
}
