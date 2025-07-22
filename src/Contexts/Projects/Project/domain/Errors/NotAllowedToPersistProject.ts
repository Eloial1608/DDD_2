import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class NotAllowedToPersistProject extends DomainError {
  protected code = 'not-allowed-to-persist-project'
  protected message

  constructor (id: Id) {
    super()
    this.message = `The project with id ${id} was not allowed to be persisted`
  }
}