import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class UserAlreadyExistsById extends DomainError {
  protected code = 'user-already-exists'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A user with id ${id} already exists`
  }
}
