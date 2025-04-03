import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class DataNeeded extends DomainError {
  protected code = 'data-needed'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A event with id ${id} can't be created: Data is needed if the event is online`
  }
}
