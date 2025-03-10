import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class NotAllowedToPersistSection extends DomainError {
  protected code = 'not-allowed-to-persist-section'
  protected message

  constructor (id: Id) {
    super()
    this.message = `Can't persist the section with id ${id}`
  }
}
