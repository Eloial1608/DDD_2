import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class UserNotFound extends DomainError {
  protected code = 'user-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A user with id ${id} wasn't found`
  }
}
