import { DomainError } from '@Shared/domain/Errors/DomainError'
import { AccountId } from '../ValueObjects/AccountId'

export class AccountMovementAlreadyExists extends DomainError {
  protected code = 'account-movement-already-exists'
  protected message

  constructor (id: AccountId) {
    super()
    this.message = `An account movement with id ${id} already exists`
  }
}
