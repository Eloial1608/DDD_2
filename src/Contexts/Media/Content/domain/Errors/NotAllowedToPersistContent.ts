import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class NotAllowedToPersistContent extends DomainError {
  protected code = 'not-allowed-to-persist-content'
  protected message

  constructor (id: Id) {
    super()
    this.message = `Can't persist the content with id ${id}`
  }
}
