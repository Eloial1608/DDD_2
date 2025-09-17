import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class UserTitleNotFound extends DomainError {
  protected code = 'space-user-title-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A userTitle with id ${id} wasn't found`
  }
}
