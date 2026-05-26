import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class CardBlocked extends DomainError {
  protected code = 'card-blocked'
  protected message

  constructor (id: Id) {
    super()
    this.message = `Card with id ${id} is blocked and cannot be used for operations`
  }
}
