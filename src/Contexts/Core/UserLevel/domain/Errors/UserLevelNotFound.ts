import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class UserLevelNotFound extends DomainError {
  protected code = 'user-level-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A user level with id ${id} wasn't found`
  }
}
