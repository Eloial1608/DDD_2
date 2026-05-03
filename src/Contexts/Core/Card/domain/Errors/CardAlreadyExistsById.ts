import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class CardAlreadyExistsById extends DomainError {
  protected code = 'Card-already-exists'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A Card with id ${id} already exists`
  }
}
