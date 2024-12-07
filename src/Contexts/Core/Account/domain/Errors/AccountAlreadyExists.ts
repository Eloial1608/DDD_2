import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class AccountAlreadyExists extends DomainError {
  protected code = 'account-already-exists'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A account with id ${id} already exists`
  }
}
