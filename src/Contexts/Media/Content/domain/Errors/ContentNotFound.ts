import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class ContentNotFound extends DomainError {
  protected code = 'content-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A content with id ${id} wasn't found`
  }
}
