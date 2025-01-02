import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class NotAllowedToPersistPost extends DomainError {
  protected code = 'not-allowed-to-persist-post'
  protected message

  constructor (id: Id) {
    super()
    this.message = `Can't persist the post with id ${id}`
  }
}
