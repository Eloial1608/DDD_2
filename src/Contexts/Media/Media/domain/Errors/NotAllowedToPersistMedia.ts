import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class NotAllowedToPersistMedia extends DomainError {
  protected code = 'not-allowed-to-persist-media'
  protected message

  constructor (id: Id) {
    super()
    this.message = `Can't persist the media with id ${id}`
  }
}
