import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class AccountNotFound extends DomainError {
  protected code = 'Account-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A Account with id ${id} wasn't found`
  }
}
