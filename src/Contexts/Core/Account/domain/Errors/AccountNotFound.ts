import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class AccountNotFound extends DomainError {
  protected code = 'account-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A account with id ${id} wasn't found`
  }
}
