import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class NotAllowedToPersistEvent extends DomainError {
  protected code = 'not-allowed-to-persist-event'
  protected message

  constructor (id: Id) {
    super()
    this.message = `Can't persist the event with id ${id}`
  }
}
