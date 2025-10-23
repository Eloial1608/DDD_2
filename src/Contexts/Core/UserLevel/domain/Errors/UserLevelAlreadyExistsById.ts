import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class UserLevelAlreadyExistsById extends DomainError {
  protected code = 'user-level-already-exists'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A user level with id ${id} already exists`
  }
}
