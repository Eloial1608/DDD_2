import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class TransactionAlreadyExistsById extends DomainError {
  protected code = 'transaction-already-exists'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A transaction with id ${id} already exists`
  }
}
