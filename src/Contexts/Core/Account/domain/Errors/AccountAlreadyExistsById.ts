import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class AccountAlreadyExistsById extends DomainError {
  protected code = 'Account-already-exists'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A Account with id ${id} already exists`
  }
}
