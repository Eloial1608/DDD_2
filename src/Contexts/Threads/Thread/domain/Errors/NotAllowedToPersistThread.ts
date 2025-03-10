import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class NotAllowedToPersistThread extends DomainError {
  protected code = 'not-allowed-to-persist-thread'
  protected message

  constructor (id: Id) {
    super()
    this.message = `Can't persist the Thread with id ${id}`
  }
}
